import conf from "../conf/conf";
import {Client,ID,Databases,Query,Storage} from "appwrite"
import authservice from "./auth";
import { useState } from "react";


// const userdata = useSelector((state) => state.auth.userdata);

// console.log(user);


export class Services{
    client =  new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createpost({title,slug,content,featuredimage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("appwrite service :: post :: error",error);
        }
    }

    async updatepost(slug,{title,content,featuredimage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status
                }
            )
        } catch (error) {
            console.log("appwrite service :: update :: error",error);
        }
    }

    async deletepost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("appwrite service :: delete :: error",error);
            return false;
        }
    }

    async getpost(slug){
        try {
             return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("appwrite service :: login :: error",error);
            return false;
        }
    }

    async getCurrentUserId(){
        try {
           const user =  await authservice.getCurrentUser();
           console.log(user.$id);
        //    userinfo.then(
        //     function(res){
        //         userid = res.$id
        //     },
        //     function(err){
        //         console.log(err);
        //     }
        //    )
           return user.$id;
        } catch (error) {
            console.log("appwrite service :: currentuser :: error",error)
        }
    }

    async getPosts(){
        try {
            const userId = await this.getCurrentUserId();
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
               [
                    Query.equal("userId",userId)
                ],
            )
        } catch (error) {
            console.log("appwrite service :: getpost :: error",error);
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("appwrite service :: fileupload :: error",error);
            return false;
        }
    }

    async deletefile(fileId){
        try {
             await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("appwrite service :: filedelte :: error",error);
            return false;
        }
    }

    getfilepreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Services()

export default service