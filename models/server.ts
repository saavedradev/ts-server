import express, {Application} from 'express';
import userRoutes from '../routes/usuario';
import cors from 'cors';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        //metodos iniciales
        this.middlewares();
        //definir mis rutas
        this.routes();
    }

    middlewares(){
        //funciones que se ejecutan antes de pasar por las rutas
        //CORS
        this.app.use( cors());

        //Lectura del body
        this.app.use(express.json());

        //Carpeta publica
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use( this.apiPaths.usuarios, userRoutes)
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto '+ this.port);
        })
    }
}

export default Server;