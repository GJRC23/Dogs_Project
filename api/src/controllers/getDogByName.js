const { getDogs } = require('./getDogs');
const { getDbDogs } = require('./getDbDogs');

const getDogByName = async (name) => {
    const allDogs = await getDogs();
    const dbDogs = await getDbDogs();
    return [...allDogs, ...dbDogs].filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
}; //We join the dogs of the DB with those of the API and filter them by name to send them to the Route

module.exports = {
    getDogByName
}