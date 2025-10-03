
import { customAlphabet } from "nanoid";


export const DB_URL= "htt://localhost:8888/api"



export const createRoomID = () => {
    const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 12);
    return nanoid()

}