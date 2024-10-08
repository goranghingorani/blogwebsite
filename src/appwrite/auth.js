import conf from "../conf/conf";
import {Client,ID,Account} from "appwrite"

export class Authservice{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            console.log("appwrite service :: login :: error",error);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error
        }
        return null
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("appwrite service :: logout :: error",error);
        }
    }
}

const authservice = new Authservice()

export default authservice