const express = require('express');
const app = express();

app.use(express.json());

const db = require('./models');

// Routers
const postRouter = require('./routes/Posts');
app.use('/api/v1/post', postRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log(`Server is running at http://localhost:${3001}`);
    })
})




