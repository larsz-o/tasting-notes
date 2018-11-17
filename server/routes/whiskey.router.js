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
        const review = req.body;
        console.log(review); 
        const query = `INSERT INTO "reviews" ("whiskey_id", "person_id", "date", "price", "appearance", "nose", "taste", "location", "bottle_condition", "glass_type", "rating", "notes", "repeat") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`;
        pool.query(query, [review.id, req.user.id, review.date, review.price, review.appearance, review.nose, review.taste, review.location, review.bottle_condition, review.glass_type, review.rating, review.notes, review.repeat]).then((results) => {
            res.sendStatus(201);
        }).catch((error)=> {
            console.log('Error posting whiskey', error);
            res.sendStatus(500); 
        })
    } else {
        res.sendStatus(500); 
    }
});

module.exports = router;