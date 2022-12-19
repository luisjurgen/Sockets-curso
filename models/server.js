import express from 'express';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.',import.meta.url));

import {Server as ServerSocket} from 'socket.io';
import { createServer } from 'http'; 

import cors from 'cors';
import { sockerController } from '../sockets/controller.js';


class Server{
   constructor(){
      this.app = express();
      this.port = process.env.PORT;
      this.server = createServer(this.app);
      this.io = new ServerSocket(this.server);
      
      this.paths={}      

      //Middlewares (funciones que van a anadirle otra funcion a nuestro webserver)
      this.middlewares();
      
      //Rutas de mi aplicacion
      this.routes();

      //Sockets
      this.sockets();

   }

   middlewares(){
      //CORS
      this.app.use(cors())

      //directorio publico
      this.app.use(express.static('public'));

     
   }

   routes(){
      // this.app.use(this.paths.auth,routerAuth);      
   }

   sockets(){
      this.io.on('connection',sockerController)
   }
   listen(){
      this.server.listen(this.port, () => {
         console.log(`Example app listening on port ${this.port}`)
      })

   }
   
}

export {Server} 