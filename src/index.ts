import express, { Request, Response } from 'express'
import cors from 'cors'
import { TVideoDB } from './types'
//import { db } from './database/BaseDatabase'
import { VideoDatabase } from './database/VideoDatabase'
import { Video } from './model/Video'


const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
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
})
//get videos
app.get("/videos", async (req: Request, res: Response) => {
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
})

//APP POST -create

app.post("/videos", async (req: Request, res: Response) => {
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
})
// put -> atualizar - editar
app.put("/videos/:id", async (req: Request, res: Response) => {
    try {
    const id: string = req.params.id
    const { title, duration } = req.body

    const videoDatabase = new VideoDatabase()
    const videoDB = await videoDatabase.findVideoById(id)

    if (!videoDB) {
        res.status(404)
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

    res.status(200).send(video)
} catch (error) {
    console.log(error)

    if (res.statusCode === 200) {
        res.statusCode = 500
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
}
})

//**********************// */

app.delete("/videos/:id", async (req: Request, res: Response) => {
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
})

