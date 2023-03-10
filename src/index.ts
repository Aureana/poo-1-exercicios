import express, { Request, Response } from 'express'
import cors from 'cors'
import { TVideoDB } from './types'
//import { db } from './database/BaseDatabase'
import { VideoDatabase } from './database/VideoDatabase'
import { Video } from './model/Video'
import { VideoController } from './controller/VideoController'


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
const videoController = new VideoController()


app.get("/videos", videoController.getVideos)

app.post("/videos", videoController.createVideo)

app.put("/videos/:id", videoController.editVideo)
  
app.delete("/videos/:id", videoController.deleteVideo)