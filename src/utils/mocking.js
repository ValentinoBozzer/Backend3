const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

const PET_SPECIES = ['perro', 'gato', 'conejo', 'hamster', 'pájaro'];
const PET_BREEDS = {
    perro: ['Labrador', 'Golden Retriever', 'Pastor Alemán', 'Bulldog', 'Poodle'],
    gato: ['Siamés', 'Persa', 'Maine Coon', 'Bengalí', 'Ragdoll'],
    conejo: ['Holandés', 'Angora', 'Rex', 'Mini Lop', 'Holland Lop'],
    hamster: ['Sirio', 'Roborovski', 'Chino', 'Ruso', 'Campbell'],
    pájaro: ['Canario', 'Periquito', 'Agapornis', 'Cacatúa', 'Loro']
};

const generatePets = (count) => {
    const pets = [];
    for (let i = 0; i < count; i++) {
        const species = faker.helpers.arrayElement(PET_SPECIES);
        const breed = faker.helpers.arrayElement(PET_BREEDS[species]);
        
        pets.push({
            name: faker.animal[species](),
            species,
            breed,
            age: faker.number.int({ min: 1, max: 15 }),
            description: faker.lorem.paragraph(),
            adopted: false,
            owner: null,
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
            health: {
                vaccinated: faker.datatype.boolean(),
                sterilized: faker.datatype.boolean(),
                lastCheckup: faker.date.past()
            },
            characteristics: {
                size: faker.helpers.arrayElement(['pequeño', 'mediano', 'grande']),
                temperament: faker.helpers.arrayElement(['tranquilo', 'juguetón', 'nervioso', 'sociable']),
                needsSpecialCare: faker.datatype.boolean()
            }
        });
    }
    return pets;
};

const generateUsers = async (count) => {
    const users = [];
    const hashedPassword = await bcrypt.hash('coder123', 10);
    
    for (let i = 0; i < count; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        
        users.push({
            firstName,
            lastName,
            email: faker.internet.email({ firstName, lastName }),
            password: hashedPassword,
            role: faker.helpers.arrayElement(['user', 'admin']),
            pets: [],
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
            profile: {
                phone: faker.phone.number(),
                address: {
                    street: faker.location.street(),
                    city: faker.location.city(),
                    state: faker.location.state(),
                    zipCode: faker.location.zipCode()
                },
                preferences: {
                    preferredSpecies: faker.helpers.arrayElements(PET_SPECIES, { min: 1, max: 3 }),
                    maxPets: faker.number.int({ min: 1, max: 5 })
                }
            }
        });
    }
    return users;
};

module.exports = {
    generatePets,
    generateUsers
}; 