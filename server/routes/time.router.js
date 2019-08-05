const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log(req.user)
    // return all times
    const queryText = `SELECT * FROM schedule ORDER BY start_date ASC;`;
    pool.query(queryText)
        .then( (result) => {
            res.send(result.rows);
            console.log('result rows', result.rows )
        })
        .catch( (error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});

// posts scheduled dates to the database.
router.post('/', (req,res) => {
    console.log('req.body', req.body)
    const newTripTimes = req.body;
    const queryText = `INSERT INTO "schedule" ("start_date", "end_date", "user_id", "open_closed")
    VALUES ($1, $2, $3, $4);`;
    const queryValues = [
        newTripTimes.startDate,
        newTripTimes.endDate,
        newTripTimes.user_id,
        newTripTimes.reserve,
        
    ];
    pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(201); })
    .catch((err) => {
      console.log('Error completing POST Dates', err);
      res.sendStatus(500);
    });
});

module.exports = router;