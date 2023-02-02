import { Request, Response } from "express"
import { VideoDatabase } from "../database/VideoDatabase"
import { Video } from "../model/Video"
import { TVideoDB } from "../types"


export class VideosController {
  public getVideos = async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string | undefined

        

        //vamos pegar as informações vindas do videosBD e INSTANCIA-LA em um objeto da classe Video
        const videoDatabase = new VideoDatabase
        const videosDB = await videoDatabase.findVideos(q)

        const video: Video[] = videosDB.map((videoDB) => new Video(
            videoDB.id,
            videoDB.title,
            videoDB.duration,
            videoDB.created_at
        ))

        //videos[0].name = "patricia" // não permite pq name é privado na classe User

        res.status(200).send(video) //dado instanciado
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
}
  public createVideos = async (req: Request, res: Response) => {
    try {
        const { id, title, duration, created_at } = req.body //dado cru

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string")
        }

        if (typeof title !== "string") {
            res.status(400)
            throw new Error("'title' deve ser string")
        }

        if (typeof duration !== "number") {
            res.status(400)
            throw new Error("'duration' deve ser number")
        }

        if (typeof created_at !== "string") {
            res.status(400)
            throw new Error("'created_at' deve ser string")
        }

        //const [videoDBExists]: TVideoDB[] | undefined[] = await db("videos").where({ id })
        const videoDatabase = new VideoDatabase()
        const videoDBExists = await videoDatabase.findVideoById(id)


        if (videoDBExists) {
            res.status(400)
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

        res.status(201).send(newVideo)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
}
public editVideos = async (req: Request, res: Response) => {
    try {

        const idVideo = req.params.id
        const { id, title, duration } = req.body
        const videoBaseDatabase = new VideoDatabase()

        if (!idVideo) {
            res.status(400)
            throw new Error("Favor informar um id válido");
        }
        const video = await videoBaseDatabase.findVideoById(idVideo)

        if (!video) {
            res.status(404)
            throw new Error("Video não encontrado");
        }
        if (typeof duration !== "undefined") {
            if (isNaN(duration)) {
                res.status(400)
                throw new Error("Duração é um número");

            }
        }
        const newVideo = new Video(
            id || video.id,
            title || video.title,
            duration || video.duration,
            new Date(Date.now()).toUTCString()
        )
        const newVideoDB: TVideoDB = {
            id: newVideo.getId(),
            title: newVideo.getTitulo(),
            duration: newVideo.getDuracao(),
            created_at: newVideo.getCreated_at()

        }
        await videoBaseDatabase.updateVideo(newVideoDB, video.id)
        res.status(200).send({
            messsage: "Video editado com sucesso",
            result: newVideo
        })

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

} 
public deleteVideos = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const videoBaseDatabase = new VideoDatabase()
        const videoAvalible = await videoBaseDatabase.findVideoById(id)

        if(!videoAvalible){
            res.status(404)
            throw new Error("Video não encontrado");
            
        }else{
        
            await videoBaseDatabase.deleteVideo(id)
            res.status(200).send({
                message:"video apagado com sucesso",
            })
        }

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
}
}