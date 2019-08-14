const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    //console.log('req.body', req.body)
    // return all logs
    const queryText = `SELECT "user"."username","guest_log"."user_id", "guest_log"."text", "guest_log"."date_stamp", "guest_log"."id"
    FROM "guest_log"
    JOIN "user" ON "user"."id" = "guest_log"."user_id"
    ORDER BY "guest_log"."id" DESC;`;
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
     //console.log('req.body', req.body)
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

 router.delete('/:id',rejectUnauthenticated, (req, res) => {
     console.log('in Delete router for guest.', req.params.id);
     const idToDelete = req.params.id;
     const sqlText = `DELETE FROM guest_log WHERE id=$1 AND user_id=$2;`;
     pool.query(sqlText, [idToDelete, req.user.id])
         .then(response => {
             res.sendStatus(200);
         })
         .catch(error => {
             console.log('error in DELETE', error);
             res.sendStatus(500);
         })
 })



module.exports = router;