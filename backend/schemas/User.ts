import { list } from "@keystone-next/keystone/schema";
import { text, password, relationship } from "@keystone-next/fields";

// Named Export
export const User = list({
  // access:
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
    orders: relationship({ ref: 'Order.user', many: true})
  },
});
