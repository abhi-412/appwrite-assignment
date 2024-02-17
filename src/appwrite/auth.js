/* eslint-disable no-useless-catch */
import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name,phone}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name,phone);
            if (userAccount) {
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
        return null;
    }



    async updateEmail(email,password){
        try{
            return await this.account.updateEmail(email,password);
        }catch(error){
            console.log("Appwrite serive :: UpdateEmail :: error", error);
        }

    }
    async updatePhone(phone,password){
        try{
            let user = await this.account.updatePhone(phone,password);
            return user
        }catch(error){
            console.log("Appwrite serive :: UpdatePhone :: error", error);
        }
    }
    async updateName(name){
        try{
            this.account.updateName(name);
        }catch(error){
            console.log("Appwrite serive :: UpdateName :: error", error);
        }

    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService


