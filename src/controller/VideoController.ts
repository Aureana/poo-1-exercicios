import { Request, Response } from "express"
import { VideoBusiness } from "../business/videosBusiness"



export class VideoController {

    public getVideos = async (req: Request, res: Response) => {
        try {
            const q = req.query.q as string | undefined  

            const userBusiness = new VideoBusiness()
            const output = await userBusiness.getVideos(q)
    
            res.status(200).send(output) //dado instanciado
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
    //post create
    public createVideo = async (req: Request, res: Response) => {
        try {
            const input ={
                id: req.body.id,
                title: req.body.title,
                duration: req.body.duration,
                created_at: req.body.created_at,
            }
            const videoBusiness = new VideoBusiness()
            const output = await videoBusiness.createVideos(input)
    
            res.status(201).send(output)
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
    public editVideo = async (req: Request, res: Response) => {
        try {
            const input ={ 
                id: req.params.id,
                title: req.body.title,
                duration: req.body.duration 
            }

            const videoBusiness = new VideoBusiness()
            const output = await videoBusiness.editVideo(input)
        
    
        res.status(200).send(output)
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
    }
    public deleteVideo = async (req: Request, res: Response) => {
        try {
            const id = req.params.id

            const videoBusiness = new VideoBusiness()
            const output = await videoBusiness.deleteVideo(id)
    
            res.status(200).send(output)
    
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