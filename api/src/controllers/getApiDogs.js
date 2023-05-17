const axios = require('axios');
const { API_KEY, API_URL } = require("../config/index");

const getApiDogs = async () => {
    const getData = await axios(`${API_URL}?api_key=${API_KEY}`);
    const infoData = await getData.data.map(dog => {
        return {
            id: dog.id,
            name: dog.name,
            height: dog["height"]["metric"],
            weight: dog["weight"]["metric"],
            age: dog.life_span,
            temperament: dog.temperament?.split(",").map(temperament => temperament.trim()),
            origin: dog.origin,
            image: dog.image.url,
            //We access to the properties using bracket notation because they are always the same
        }
    })
    return infoData;
}

module.exports = {
    getApiDogs
}