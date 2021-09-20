import { list } from "@keystone-next/keystone/schema";
import { text, password, relationship } from "@keystone-next/fields";
import { permissions, rules } from "../access";

// Named Export
export const User = list({
  access: {
    create: () => true,
    read: rules.canManageUsers,
    update: rules.canManageUsers,
    // only people with the permission can delete themselves.
    // Cant delete yourself.
    delete: permissions.canManageUsers
  },
  ui: {
    // hide the backend ui from regular users
    hideCreate: args => !permissions.canManageUsers(args),
    hideDelete: args => !permissions.canManageUsers(args),

  },
  // ur
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    cart: relationship({
      ref: "CartItem.user",
      many: true,
      ui: {
        createView: {
          fieldMode: "hidden",
        },
        itemView: { fieldMode: "read" },
      },
    }),
    orders: relationship({ ref: 'Order.user', many: true}),
    role: relationship({
      ref: 'Role.assignedTo',
      access: {
        create: permissions.canManageUsers,
        update: permissions.canManageUsers
      }
    }),
    products: relationship({
      ref: 'Product.user',
      any: true
    })
  },
});
