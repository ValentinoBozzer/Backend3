import __dirname from "./index.js";
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        // Si la ruta contiene 'documents', guardar en carpeta documents
        if (req.url.includes('/documents')) {
            cb(null,`${__dirname}/../public/documents`)
        } else {
            cb(null,`${__dirname}/../public/img`)
        }
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer({storage})

export default uploader;