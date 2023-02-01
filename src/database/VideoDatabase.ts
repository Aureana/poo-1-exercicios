import { BaseDatabase } from "./BaseDatabase";
import { TVideoDB } from "../types";

export class VideoDatabase extends BaseDatabase {
    //atributos
    public static TABLE_VIDEOS = "videos"


    //metodos 
    //get e post
    public async findVideos(q: string | undefined): Promise<TVideoDB[]> {

        let videosDB //underfined

        if (q) {
            const result: TVideoDB[] = await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEOS)
            .where("title", "LIKE", `%${q}%`)
            videosDB = result
        } else {
            const result: TVideoDB[] = await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEOS)
            videosDB = result //dado cru
        }
        return videosDB
    }
//get 
    public async findVideoById(id: string | undefined): Promise<TVideoDB | undefined> {
        const [videoDBExists]: TVideoDB[] | undefined[] = await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEOS)
            .where({ id })
        return videoDBExists
    }
// post create
    public async insertVideo(newVideoDB: TVideoDB): Promise<void> {
        await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEOS)
            .insert(newVideoDB)
    }  
//edit
public async updateVideo(newVideoDB:TVideoDB, id:string):Promise<void>{
    await BaseDatabase
    .connection(VideoDatabase.TABLE_VIDEOS)
    .update(newVideoDB)
    .where({id})
}

    //delete
    public async deleteVideo(id:string):Promise<void>{
        await BaseDatabase
        .connection(VideoDatabase.TABLE_VIDEOS)
        .del()
        .where({id})
    }


}