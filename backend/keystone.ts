import {config, createSchema} from '@keystone-next/keystone/schema';
import {createAuth} from '@keystone-next/auth'
import 'dotenv/config';
import {User} from './schemas/User'
import {Product} from './schemas/Product'
import {CartItem} from './schemas/CartItem'
import {ProductImage} from './schemas/ProductImage'
import {withItemData, statelessSessions} from '@keystone-next/keystone/session'
import { insertSeedData } from './seed-data';
import { extendGraphqlSchema } from './mutations';
const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const {withAuth} = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: [
            'name', 'email', 'password'
        ],
        // TODO: Add inital roles here
    },
    passwordResetLink: {
        async sendToken(args) {
          console.log(args);
        },
      },

})
const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
    secret: process.env.COOKIE_SECRET
};



export default withAuth(config({
    // @ts-ignore
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true
        }
    },
    db: {
        adapter: 'mongoose',
        url: databaseURL,
        async onConnect(keystone){
            console.log('Connected to KeyStone JS')
            if(process.argv.includes('--seed-data')){
                await insertSeedData(keystone);
            }
           
        } 
    },
    lists: createSchema({
        User, Product, ProductImage, CartItem
        // Schema items go in here
    }),
    extendGraphqlSchema: extendGraphqlSchema,
    ui: {
        // TODO: change this for roles
        isAccessAllowed: ({session}) => {
            // console.log(session)
            return session
                ?.data
        }
    },
    session: withItemData(statelessSessions(sessionConfig), {User: 'id'})
}));
