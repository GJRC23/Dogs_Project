const { Router } = require('express');
const { getDogs } = require('../controllers/getDogs');
const { getDogById } = require('../controllers/getDogById');
const { getDogByName  } = require('../controllers/getDogByName');
const { postDogs } = require('../controllers/postDogs');
const router = Router();

router.get("/", async (req, res) => {
    const name = req.query.name;
    const allDogs = await getDogs();
    try {
        if (name) {
            const dogFound = await allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
            dogFound.length ? res.status(200).send(dogFound) : res.status(404).json({ msg: "Dog not found" })
        } else return res.status(200).send(allDogs)
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const dog = await getDogById(id);
        if (dog) {
            res.json(dog);
        } else {
            res.status(404).json({ message: 'Dog ID not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    const name = req.query.name.toLowerCase();
    try {
        const dogs = await getDogByName(name)
        if (dogs.length) {
            return res.status(200).json(dogs);
        } else {
            return res.status(404).json({ message: "There aren't dogs with that name" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { name, height, weight, age, image, temperament, createInDb} = req.body;
    try { 
        if (!name || !height || !weight || !age || !image || !temperament){
            throw Error("There is missing information to create the dog");
        } else {
            const newDog = await postDogs(name, height, weight, age, image, temperament, createInDb);
            return res.status(200).json(newDog);
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
});

module.exports = router;