const express = require("express");
const cors = require('cors')
const userRouter = require('./routes/user')
const app = express();
const movieRouter = require('./routes/movies')
const reviewRouter = require('./routes/review')
app.use(cors());

app.use(express.json())
app.use('/user', userRouter)
app.use('/review',reviewRouter)
app.use('/movie', movieRouter)

app.listen(4000, 'localhost', () => {
  console.log('server started at port 4000')
})
