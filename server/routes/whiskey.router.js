const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        const query = `SELECT * FROM "whiskey" ORDER BY "name" ASC;`;
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
    if(req.isAuthenticated()){
        const query = `INSERT INTO "reviews" `
    } else {
        res.sendStatus(500); 
    }
});

module.exports = router;