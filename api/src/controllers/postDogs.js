const { Dog, Temperament } = require('../db.js');
const { Op } = require('sequelize');
const { getTemps } = require('./getTemps');

const postDogs = async (name, height, weight, age, image, temperament, createInDb) => {
    // Search if there's a dog with the same name in de DB using the operator Op.ilike to search without taking in consideration big  or smallCaps.
    const dbResponse = await Dog.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`,
            },
        },
    });
    console.log(dbResponse);
    if (dbResponse.length) throw new Error("There is already a dog with that name");
    // If the DB already has a dog with that name ir returns a message
    // if it doesn't exist the DB will create a new name.
    const newDog = await Dog.create({
        name: name,
        height: height,
        weight: weight,
        age: age,
        image: image,
        createInDb: true,
    });
    // We check if the temperaments table its loaded using count(), if not we create invoking getTemps
    const temperamentCount = await Temperament.count();
    if (temperamentCount === 0) {
        await getTemps();
    }
    const tempsFound = [];
    for (let i = 0; i < temperament.length; i++) {
        const tempFound = await Temperament.findOne({ where: { name: temperament[i] } });
        if (!tempFound) {
            throw new Error(`Tipo de ${temperament[i]} no existe`);
        }
        tempsFound.push(tempFound);
    }
    // We add the temperament with add method from SQL, thanks to the relation between Dog and Temperament
    await newDog.addTemperament(tempsFound);
    return newDog;
}

module.exports = {
    postDogs
}