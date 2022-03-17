import config from './config.js'
import { Controller } from './controller.js'
import { logger } from './util.js'
const controller = new Controller()
const {
    location,
    pages: {
        homeHTML
    }
} = config


async function routes(request, response){
    const { method, url} = request
    //redireciona para home se o barra for vazio
    if(method === 'GET' && url === '/'){
        response.writeHead(302,{
            'Location': location.home
                })
        return response.end()
    }

    if(method === 'GET' && url === '/home'){
        const {
            stream
        } = await controller.getFileStream(homeHTML)
        
       return stream.pipe(response)
    }
}

export function handler(request, response){
    return routes(request, response)
    .catch(error => logger.error(`Deu ruimm ${error.stack}`))
}