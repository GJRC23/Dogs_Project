const axios = require('axios');
const { API_KEY, API_URL } = require("../config/index");

const getApiDogs = async () => {
    const getData = await axios(`${API_URL}?api_key=${API_KEY}`);
    const infoData = await getData.data.map(dog => {
        return {
            id: dog.id,
            name: dog.name,
            age: dog.life_span,
            image: dog.image.url,
            height: dog["height"]["metric"],
            weight: dog["weight"]["metric"],
            //We access to the properties using bracket notation because they are always the same
            temperament: dog.temperament?.split(",").map(temperament => temperament.trim())
        }
    })
    return infoData;
}

module.exports = {
    getApiDogs
}