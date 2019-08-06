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
    const queryText = `SELECT "user"."username", "schedule"."start_date", "schedule"."end_date", "schedule"."open_closed", "user"."id","schedule"."user_id" 
    from "user"
    JOIN "schedule" ON "schedule"."user_id" = "user"."id"
    ORDER BY "start_date" ASC;`;
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
    console.log('req.user', req.user)
    const newTripTimes = req.body;
    const queryText = `INSERT INTO "schedule" ("start_date", "end_date", "user_id", "open_closed")
    VALUES ($1, $2, $3, $4);`;
    const queryValues = [
        newTripTimes.startDate,
        newTripTimes.endDate,
        req.user.id,
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