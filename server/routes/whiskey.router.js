const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        const query = `SELECT * FROM "whiskey";`;
        pool.query(query).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('Error getting whiskeys', error);
            res.sendStatus(500); 
        })
    } else {
        res.sendStatus(403);
    }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;