const { getDogs } = require('./getDogs');

const getDogById = async (id) => {
    const allDogs = await getDogs();
    return allDogs.find((dog) => dog.id == id);
  };
  
  module.exports = {
    getDogById
  };