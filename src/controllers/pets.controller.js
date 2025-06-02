import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js"
import __dirname from "../utils/index.js";
import { CustomError, ErrorTypes } from "../utils/errors.js";

const getAllPets = async(req, res, next) => {
    try {
        const pets = await petsService.getAll();
        res.send({status:"success", payload:pets});
    } catch (error) {
        next(error);
    }
}

const createPet = async(req, res, next) => {
    try {
        const {name, specie, birthDate} = req.body;
        if(!name || !specie || !birthDate) {
            throw new CustomError(
                ErrorTypes.VALIDATION_ERROR.message,
                ErrorTypes.VALIDATION_ERROR.statusCode,
                { code: ErrorTypes.VALIDATION_ERROR.code }
            );
        }
        const pet = PetDTO.getPetInputFrom({name, specie, birthDate});
        const result = await petsService.create(pet);
        res.send({status:"success", payload:result});
    } catch (error) {
        next(error);
    }
}

const updatePet = async(req, res, next) => {
    try {
        const petUpdateBody = req.body;
        const petId = req.params.pid;
        const result = await petsService.update(petId, petUpdateBody);
        if (!result) {
            throw new CustomError(
                ErrorTypes.PET_NOT_FOUND.message,
                ErrorTypes.PET_NOT_FOUND.statusCode,
                { code: ErrorTypes.PET_NOT_FOUND.code }
            );
        }
        res.send({status:"success", message:"pet updated"});
    } catch (error) {
        next(error);
    }
}

const deletePet = async(req, res, next) => {
    try {
        const petId = req.params.pid;
        const result = await petsService.delete(petId);
        if (!result) {
            throw new CustomError(
                ErrorTypes.PET_NOT_FOUND.message,
                ErrorTypes.PET_NOT_FOUND.statusCode,
                { code: ErrorTypes.PET_NOT_FOUND.code }
            );
        }
        res.send({status:"success", message:"pet deleted"});
    } catch (error) {
        next(error);
    }
}

const createPetWithImage = async(req, res, next) => {
    try {
        const file = req.file;
        const {name, specie, birthDate} = req.body;
        if(!name || !specie || !birthDate) {
            throw new CustomError(
                ErrorTypes.VALIDATION_ERROR.message,
                ErrorTypes.VALIDATION_ERROR.statusCode,
                { code: ErrorTypes.VALIDATION_ERROR.code }
            );
        }
        const pet = PetDTO.getPetInputFrom({
            name,
            specie,
            birthDate,
            image:`${__dirname}/../public/img/${file.filename}`
        });
        const result = await petsService.create(pet);
        res.send({status:"success", payload:result});
    } catch (error) {
        next(error);
    }
}

export default {
    getAllPets,
    createPet,
    updatePet,
    deletePet,
    createPetWithImage
}