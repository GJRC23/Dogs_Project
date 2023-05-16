const { getApiDogs } = require('./getApiDogs');
const { getDbDogs } = require('./getDbDogs');

const getDogs = async () => {
    const apiDogs = await getApiDogs();
    const dbDogs = await getDbDogs();
    const allDogs = apiDogs.concat(dbDogs);

    return allDogs;
}

module.exports = {
    getDogs
}