const express= require('express');
require('./src/db/mongoose');
require('./src/models/user');

const userRouter = require('./src/routers/user')
const User = require('./src/models/user');
const Problems = require('./src/models/problems');
const Solutions = require('./src/models/solutions')
const problemsRouter = require('./src/routers/problems')
const solutionRouter = require('./src/routers/solutions')
const discussionRouter = require('./src/routers/discussion')
const cors = require('cors');

const app = express()
app.use(cors())
app.use(express.json())
app.use(userRouter);
app.use(problemsRouter);
app.use(solutionRouter);
app.use(discussionRouter)

app.listen(3000,()=>{
    console.log(`http://localhost:3000`);
})
