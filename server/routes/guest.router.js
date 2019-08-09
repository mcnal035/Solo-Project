const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    //console.log(req.user)
    // return all logs
    const queryText = `SELECT "user"."username","guest_log"."id", "guest_log"."text", "guest_log"."date_stamp"
    FROM "guest_log"
    JOIN "user" ON "user"."id" = "guest_log"."user_id"
    ORDER BY "date_stamp";`;
    pool.query(queryText)
        .then( (result) => {
            res.send(result.rows);
        // console.log('result rows', result.rows )
        })
        .catch( (error) => {
             console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});



router.post('/', (req,res) => {
     console.log('req.body', req.body)
     const newTripTimes = req.body;
     const queryText = `Insert INTO guest_log ("text", "user_id", "date_stamp") 
     VALUES ($1, $2, NOW());`;
     const queryValues = [
         newTripTimes.log,
         req.user.id,
     ];
     pool.query(queryText, queryValues)
     .then(() => { res.sendStatus(201); })
     .catch((err) => {
       console.log('Error completing POST Dates', err);
       res.sendStatus(500);
     });
 });

module.exports = router;