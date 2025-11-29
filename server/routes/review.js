const express = require('express');
const pool = require('../db/db');
const router = express.Router();

const result = require('../utils/result')

router.post('/addReview', async (req, res) => {
    const { movie_id, review, rating, user_id, modified } = req.body
    const sql = `insert into reviews(movie_id ,review , rating , user_id , modified) values (? , ? , ? ,? , ?)`;
    pool.query(sql, [movie_id, review, rating, user_id, modified], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.put('/updateReview', async (req, res) => {
    const { review_id, review, rating, modified } = req.body;
    const checkSql = 'SELECT * FROM reviews WHERE review_id = ?';

    pool.query(checkSql, [review_id], (err, data) => {
        if (err || data.length === 0) {
            return res.send(result.createResult(err || { message: "Invalid review id" }, null));
        }
        const updateSql = `UPDATE reviews SET review = ?, rating = ?, modified = ? WHERE review_id = ?`;
        pool.query(updateSql, [review, rating, modified, review_id], (err, updateResult) => {
            res.send(result.createResult(err, updateResult));
        });
    });
});   

router.get("/getAllReview" , async(req , res) => {
    const sql = 'select * from reviews';
    pool.query(sql , (err , data) => {
        res.send(result.createResult(err , data))
    })
})

router.get("/getReviewByUser" , async(req , res) => {
    const {user_id} = req.body;
    const sql = 'select * from reviews where  user_id=?'
    pool.query(sql  , [user_id] , (error , data) => {
        res.send(result.createResult(error, data))
    })
})

router.delete('/:review_id', (req, res) => {
    const { review_id } = req.params;
    const sql = `delete from reviews where review_id = ?`;
    pool.query(sql, [review_id], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

module.exports = router;