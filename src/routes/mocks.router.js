const { Router } = require('express');
const { generatePets, generateUsers } = require('../utils/mocking');
const logger = require('../utils/logger');
const Pet = require('../dao/models/pet.model');
const User = require('../dao/models/user.model');

const router = Router();

router.get('/mockingpets', async (req, res) => {
    try {
        const pets = generatePets(100);
        logger.info('Generadas 100 mascotas de prueba');
        res.json(pets);
    } catch (error) {
        logger.error('Error al generar mascotas de prueba:', error);
        res.status(500).json({ error: 'Error al generar mascotas de prueba' });
    }
});

router.get('/mockingusers', async (req, res) => {
    try {
        const users = await generateUsers(50);
        logger.info('Generados 50 usuarios de prueba');
        res.json(users);
    } catch (error) {
        logger.error('Error al generar usuarios de prueba:', error);
        res.status(500).json({ error: 'Error al generar usuarios de prueba' });
    }
});

router.post('/generateData', async (req, res) => {
    try {
        const { users = 50, pets = 100 } = req.body;
        
        const generatedUsers = await generateUsers(users);
        const generatedPets = generatePets(pets);
        
        await User.insertMany(generatedUsers);
        await Pet.insertMany(generatedPets);
        
        logger.info(`Datos generados exitosamente: ${users} usuarios y ${pets} mascotas`);
        res.json({ 
            message: 'Datos generados exitosamente',
            users: generatedUsers.length,
            pets: generatedPets.length
        });
    } catch (error) {
        logger.error('Error al generar datos:', error);
        res.status(500).json({ error: 'Error al generar datos' });
    }
});

router.get('/loggerTest', (req, res) => {
    logger.debug('Este es un mensaje de debug');
    logger.http('Este es un mensaje de http');
    logger.info('Este es un mensaje de info');
    logger.warning('Este es un mensaje de warning');
    logger.error('Este es un mensaje de error');
    logger.fatal('Este es un mensaje fatal');
    
    res.json({ message: 'Logs generados exitosamente' });
});

module.exports = router; 