import { client } from "./config/db"

global.afterAll(async()=>{
    await client.close();
})