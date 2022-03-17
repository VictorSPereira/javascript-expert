import fs from 'fs'
import fsPromises from 'fs/promises'
import config from './config,js'
import { join, extname } from 'path'
const {
    dir: {
        publicDirectory
    }
} = config

export class Service{
    createFileStream(filename){
     return fs.createFileStream(filename)
    }
    async getFileInfo(file){
        // file = home/index.html
        const fullFilePath = join(publicDirectory, file)
        // valida se exite, se não existe estoura erro!!
        await fsPromises.access(fullFilePath)
        // retorna a extenção
        const fileType = extname(fullFilePath)
        return {
            type: fileType,
            nome: fullFilePath
        }
    }
    async getFileStream(file){
        const {
            name,
            type
        } = await this.getFileInfo(file)
        return {
            stream: this.createFileStream(name),
            type
        }
    }
}