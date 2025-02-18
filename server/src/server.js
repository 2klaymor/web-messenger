const express = require('express');
require('dotenv').config()

// Express initialization
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json())


// Routers
const userRouter = require('./routes/userRouter');
const conversationRouter = require('./routes/conversationRouter');
const messageRouter = require('./routes/messageRouter');

app.use('/user', userRouter);
app.use('/conversation', conversationRouter);
app.use('/message', messageRouter);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});