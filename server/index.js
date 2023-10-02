const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');

// Routers
const postRouter = require('./routes/Posts');
app.use('/api/v1/post', postRouter);
const commentRouter = require('./routes/Comments');
app.use('/api/v1/comments', commentRouter);
const userRouter = require('./routes/Users');
app.use('/api/v1/user', userRouter);
const likesRouter = require('./routes/Likes');
app.use('/api/v1/likes', likesRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log(`Server is running at http://localhost:${3001}`);
    })
});




