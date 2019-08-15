const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//GET route for all dates in schedule table.
router.get('/', rejectUnauthenticated, (req, res) => {
    //console.log(req.user)
    // return all times
    const queryText = `SELECT "user"."username", "schedule"."start_date", "schedule"."end_date", "schedule"."open_closed", "user"."id","schedule"."user_id", "schedule"."id" 
    from "user"
    JOIN "schedule" ON "schedule"."user_id" = "user"."id"
    where "start_date" >= now()
    ORDER BY "end_date" ASC;`;
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

// router to filter the dates on the page to only show the month selected.
router.get('/change',  (req, res) => {
   // console.log('req.query.year', req.query.year);
   // console.log('req.query.month', req.query.month);
    // return all times
    const queryText = `SELECT "user"."username", "schedule"."start_date", "schedule"."end_date", "schedule"."open_closed", "user"."id","schedule"."user_id", "schedule"."id" 
    FROM schedule
    JOIN "user" ON "schedule"."user_id" = "user"."id"
    WHERE date_part('month', start_date) = $1 AND date_part('year', start_date) = $2;`;
   const values = [req.query.month, req.query.year]
    pool.query(queryText, values)
        .then( (result) => {
            res.send(result.rows);
            console.log('result rows', result.rows )
        })
        .catch( (error) => {
            console.log(`Error on get filter ${error}`);
            res.sendStatus(500);
        });
});




// posts scheduled dates to the database.
router.post('/', (req,res) => {
   // console.log('req.user', req.user)
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


// sends the updated dates in the query to the database.
router.put('/:id', (req,res)=>{
    // console.log('req.params.id', req.params.id);
    // console.log('req.body', req.body);
    // console.log('req.user.id', req.user.id);
    const idToUpdate = req.params.id;
    const date = req.body;
    const sqlText = `UPDATE schedule SET start_date=$1, end_date=$2 WHERE user_id=$3 AND id = $4;`;
    const values = [date.updateStartDate, date.updateEndDate, req.user.id, idToUpdate];
    pool.query(sqlText, values)
    .then(response => {
        res.sendStatus(200);
    })
    .catch(error => {
        console.log('error in put to edit item', error);
    })
});


// Sends Delete query to schedule and removes the date bases on the id of the user and the id of the dates.
router.delete('/:id',rejectUnauthenticated, (req, res) =>{
    const idToDelete = req.params.id;
    const sqlText = `DELETE FROM schedule WHERE user_id=$1 AND id=$2;`;
    pool.query(sqlText, [req.user.id, idToDelete])
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('error in DELETE', error);
            res.sendStatus(500);
        })
})

module.exports = router;