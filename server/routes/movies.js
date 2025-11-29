const express = require('express');
const pool = require('../db/db');
const router = express.Router();

const result = require('../utils/result');


router.get('/getMovies' , async(req , res) => {
    const sql = 'select * from movies';
    pool.query(sql, (err , data) => {
        res.send(result.createResult(err , data))
    })
})

module.exports = router;