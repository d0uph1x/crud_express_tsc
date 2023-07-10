import { MongoClient } from "mongodb";
const {MONGO_URI = ''} = process.env

const client = new MongoClient(MONGO_URI);
const db = client.db();

export  { db, client }
