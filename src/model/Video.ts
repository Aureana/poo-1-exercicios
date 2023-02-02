export class Video {
    
    constructor(

        private id:string,
        private titulo:string,
        private duracao:number,
        private created_at: string)
    {
    }
    //OUTROS METODOS
    public getId():string{
        return this.id
    }
    public setId(newId:string):void{
        this.id = newId
    }

    public getTitulo():string{
        return this.titulo
    }
    public setTitulo(newTitulo:string):void{
        this.titulo = newTitulo
    }
//
    public getDuracao(){
        return this.duracao
    }
    public setDuracao(newDuracao:number):void{
        this.duracao = newDuracao
    }
//
    public getCreated_at(){
        return this.created_at
    }
    public setCreated_at(newCreated_at:string):void{
        this.created_at = newCreated_at
    }
    
}

const video1 = new Video("001","filme1",1.50,"2023-01-30 10:00:00")

const video2 = new Video("002","filme2", 2.20, "2023-01-30 10:00:00")

video1.setId("010")

const filme = video2.getTitulo 
