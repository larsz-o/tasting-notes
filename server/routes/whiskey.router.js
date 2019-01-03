const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const query = `SELECT * FROM "whiskey" WHERE "approved" = 'true' ORDER BY "name" ASC;`;
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
 * GETS all reviews the user submitted. 
 * Later, this should also get all reviews in the group so that the friends' reviews are also being fetched
 */
router.get('/reviews', (req, res) => {
    if(req.isAuthenticated()){
        const query = `SELECT * FROM "reviews" JOIN "whiskey" ON "whiskey"."id" = "reviews"."whiskey_id" WHERE "person_id" = $1;`;
        pool.query(query, [req.user.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('Error getting reviews', error);
            res.sendStatus(500); 
        })
    } else {
        res.sendStatus(403);
    }
})
/**
 * POST route template
 */
router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        const review = req.body;
        const query = `INSERT INTO "reviews" ("whiskey_id", "person_id", "date", "price", "location", "glass_type", "rating", "notes", "repeat") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
        pool.query(query, [review.id, req.user.id, review.date, review.price, review.location, review.glass_type, review.rating, review.notes, review.repeat]).then((results) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error posting whiskey', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(500);
    }
});
router.post('/type', (req, res) => {
    if (req.isAuthenticated()) {
        const whiskey = req.body;
        const query = `INSERT INTO "whiskey" ("name", "origin", "type") VALUES ($1, $2, $3);`;
        pool.query(query, [whiskey.name, whiskey.origin, whiskey.type]).then((results) => {
            console.log('success'); 
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error posting whiskey type', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
})
module.exports = router;