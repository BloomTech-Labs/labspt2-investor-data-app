const express = require('express');
const router = express.Router();

const definitions = require('../data/dashDefinitions.json')

router.get('/definitions', (req, res) => {
    res
        .send(definitions)
        .catch( err => { 
            res
                .status(500)
                .json({err: 'There was an error retrieving the definitions'})
        })
})

module.exports = router;