const { Dog, Temperament } = require('../db');
const { Op } = require('sequelize');
const { getTemps } = require('./getTemps');

const postDogs = async (name, height, weight, age, origin, image, temperament) => {

    console.log('Image value:', image);

    //We search if there is a dog with the same name in our DB using the Op.iLike operator to search without importing uppercases or lowercases. 
    const dbResponse = await Dog.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`,
            },
        },
    });
    if (dbResponse.length) throw new Error("That name is being used");
    //If the DB already has a dog with that name it returns a message
    //If there is no dog with that name it creates a new one in the DB
    const newDog = await Dog.create({
        name: name,
        height: height,
        weight: weight,
        age: age,
        origin: origin,
        image: image,
    });
    //We verify if the temperaments table is loaded using count(), if it is empty we create it using getTemps()
    const temperamentCount = await Temperament.count();
    if (temperamentCount === 0) {
        await getTemps();
    }
    const tempsFound = [];
    for (let i = 0; temperament && i < temperament.length; i++) {
        const tempFound = await Temperament.findOne({ where: { name: temperament[i] } });
        if (!tempFound) {
            throw new Error(`Type of ${temperament[i]} does not exist`)
        }
        tempsFound.push(tempFound);
    }
    //We add temperament using the SQL add method thanks to the relationship between Dog and Temperament
    await newDog.addTemperament(tempsFound);
    return newDog;
}

module.exports = {
    postDogs
}