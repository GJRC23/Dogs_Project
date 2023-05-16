const axios = require('axios');
const { API_KEY, API_URL } = require("../config/index");
const { Temperament } = require('../db');

const getTemps = async () => {
    const tempsData = await axios (`${API_URL}?api_key=${API_KEY}`)
    tempsData.data.forEach(dog => {
        if (dog.temperament) {
            let temps = dog.temperament.split(', ') //Take out spaces and commas
            temps.forEach(dogTemp => { // For splitting it correctly in the array
                Temperament.findOrCreate({
                    where: { name: dogTemp } //Search the model and if it doesn't find it, create a new temperament and adds it in our model
                })
            })
        }
    })
    const tempsFound = await Temperament.findAll();
    return tempsFound; //Save all the temperaments in the tempsFound in our DB
}

module.exports = {
    getTemps
}