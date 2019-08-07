import { TRM } from "../models/TRM";
import {IDAL} from "../dal/IDAL"
const MongoClient = require('mongodb').MongoClient;
const dbName = 'tech_interviews'
const collectionName ='trmresults'
const uri = process.env.MONGO_DB_URL;

const getMongoDbConnection = async (uri:string): Promise<any> => {
    const promise = new Promise((resolve, reject) => {

        MongoClient.connect(uri, { useNewUrlParser: true }, function (err:any, client:any) {
            if (err) {
                reject(err)
            }
            resolve(client);
        });

    })
    return promise;
}
export class TrmDAL implements IDAL<TRM> {
    
    async GetAllRecords(page = 0, limit = 0): Promise<TRM[]> {
        try {
            const client = await getMongoDbConnection(uri);
            const collection =  client.db(dbName).collection(collectionName);
            const results = await collection.find({}).skip(limit*(page-1)).limit(limit).toArray()  
            return results;
        } catch (error) {
            throw error;
        }
    }    
    
    async InsertRecords(records: TRM[]): Promise<void> {
        try {  
            const client = await getMongoDbConnection(uri);
            const collection = client.db(dbName).collection(collectionName);
            await collection.insertMany(records)  
        } catch (error) {
            throw error;
        }
    }
}



