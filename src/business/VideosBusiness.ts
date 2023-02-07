import { VideoDatabase } from "../database/VideoDatabase"
import { Video } from "../model/Video"
import { TVideoDB } from "../types"



export class VideoBusiness {

    public getVideos = async (q: string | undefined) => {


        const videoDatabase = new VideoDatabase
        const videosDB = await videoDatabase.findVideos(q)

        const video: Video[] = videosDB.map((videoDB) => new Video(
            videoDB.id,
            videoDB.title,
            videoDB.duration,
            videoDB.created_at
        ))

        return ({
            video: video
        })
    }

    public createVideos = async (input: any) => {

        const { id, title, duration, created_at } = input

        if (typeof id !== "string") {
            throw new Error("'id' deve ser string")
        }

        if (typeof title !== "string") {
            throw new Error("'title' deve ser string")
        }

        if (typeof duration !== "number") {
            throw new Error("'duration' deve ser number")
        }

        if (typeof created_at !== "string") {
            throw new Error("'created_at' deve ser string")
        }

        //const [videoDBExists]: TVideoDB[] | undefined[] = await db("videos").where({ id })
        const videoDatabase = new VideoDatabase()
        const videoDBExists = await videoDatabase.findVideoById(id)


        if (videoDBExists) {

            throw new Error("'id' já existe")
        }

        const newVideo = new Video(
            id,
            title,
            duration,
            new Date().toISOString()
        )

        //2 - Objeto simples para MODELAR as informações para o banco de dados
        const newVideoDB = {
            id: newVideo.getId(),
            title: newVideo.getTitulo(),
            duration: newVideo.getDuracao(),
            created_at: newVideo.getCreated_at()
        }

        //await db("videos").insert(newVideoDB)
        const NewVideoDatabase = videoDatabase.insertVideo(newVideoDB)

        const output = {
            message: "Cadastro realizado com sucesso",
            videos: newVideo
        }
        return (output)
    }

    public editVideo = async (input:any)=> {

        const { id, title, duration } = input
    
        const videoDatabase = new VideoDatabase()
        const videoDB = await videoDatabase.findVideoById(id)
    
        if (!videoDB) {
            throw new Error("Video não encontrado")
        }
    
        const video = new Video(
            id,
            title,
            duration,
            new Date().toISOString()
        )
    
        const videoDBToUpdate: TVideoDB = {
            id: video.getId(),
            title: video.getTitulo(),
            duration: video.getDuracao(),
            created_at: video.getCreated_at()
        }
    
        await videoDatabase.updateVideo(videoDBToUpdate, id)


            return({
                message: "Edição realizada",
                video: video
            })


    }

    public deleteVideo = async (id: any)=>{

        const videoBaseDatabase = new VideoDatabase()
        const videoAvalible = await videoBaseDatabase.findVideoById(id)

        if (!videoAvalible) {
            throw new Error("Video não encontrado");

        } else {

            await videoBaseDatabase.deleteVideo(id)
          
             return({
                message: "Video apagado com sucesso",
             })   
            
        }

    }

}