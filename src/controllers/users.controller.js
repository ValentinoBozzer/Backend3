import { usersService } from "../services/index.js"
import path from 'path';

const getAllUsers = async(req,res,next)=>{
    try {
        const users = await usersService.getAll();
        res.send({status:"success",payload:users})
    } catch (error) {
        next(error);
    }
}

const getUser = async(req,res,next)=> {
    try {
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if(!user) return res.status(404).send({status:"error",error:"User not found"})
        res.send({status:"success",payload:user})
    } catch (error) {
        next(error);
    }
}

const updateUser =async(req,res,next)=>{
    try {
        const updateBody = req.body;
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if(!user) return res.status(404).send({status:"error", error:"User not found"})
        const result = await usersService.update(userId,updateBody);
        res.send({status:"success",message:"User updated"})
    } catch (error) {
        next(error);
    }
}

const deleteUser = async(req,res,next) =>{
    try {
        const userId = req.params.uid;
        const result = await usersService.getUserById(userId);
        res.send({status:"success",message:"User deleted"})
    } catch (error) {
        next(error);
    }
}

const uploadDocuments = async (req, res, next) => {
    try {
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if (!user) return res.status(404).send({ status: "error", error: "User not found" });
        if (!req.files || req.files.length === 0) {
            return res.status(400).send({ status: "error", error: "No se subieron documentos" });
        }
        const documents = req.files.map(file => ({
            name: file.originalname,
            reference: path.relative(path.resolve('src/public'), file.path)
        }));
        user.documents = user.documents.concat(documents);
        await usersService.update(userId, { documents: user.documents });
        res.send({ status: "success", message: "Documentos subidos", documents: user.documents });
    } catch (error) {
        next(error);
    }
}

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
    uploadDocuments
}