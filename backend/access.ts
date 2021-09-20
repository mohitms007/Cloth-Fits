// At its simplest, access control is yes or no value depending upon users sessions

import { ListAccessArgs } from "./types";
import { permissionsList } from "./schemas/fields";

export function isSignedIn({ session } : ListAccessArgs){
    return !!session;
}

const generatedPermissions = Object.fromEntries(permissionsList.map(
    permission => [
        permission,
        function({session} : ListAccessArgs) {
            return session?.data.role?.[permission]
        } 
    ]
))


export const permissions = {
    ...generatedPermissions
}

// Rule based function

export const rules = {
    canManageProducts({ session } : ListAccessArgs) {
        if(!isSignedIn({session})){
            return false;
        }
        // 1. Do they have the permissions of canManageProducts.
        if( permissions.canManageProducts({session})) {
            return true;
        }
        // 2. If not, do they own this item.
        return { user: { id: session.itemId }}
    },
    
    canOrder({ session } : ListAccessArgs) {
        if(!isSignedIn({session})){
            return false;
        }
        // 1. Do they have the permissions of canManageProducts.
        if( permissions.canManageCart({session})) {
            return true;
        }
        // 2. If not, do they own this item.
        return { user: { id: session.itemId }}
    },

    canManageOrderItems({ session } : ListAccessArgs) {
        if(!isSignedIn({session})){
            return false;
        }
        // 1. Do they have the permissions of canManageProducts.
        if( permissions.canManageCart({session})) {
            return true;
        }
        // 2. If not, do they own this item.
        return { order: {user: { id: session.itemId }}}
    },

    canReadProducts({session} : ListAccessArgs) {
        if(!isSignedIn({session})){
            return false;
        }
        if(permissions.canManageProducts({ session })){
            return true;
        }
        // they should only see available products.
        return { status: 'AVAILABLE'}
    },

    canManageUsers({ session } : ListAccessArgs) {
        if(!isSignedIn({session})){
            return false;
        }
        // 1. Do they have the permissions of canManageProducts.
        if( permissions.canManageUsers({session})) {
            return true;
        }
        // 2. Otherwise they can update themselves only
        return {  id: session.itemId }
    },
}