import 'dotenv/config';
import express, { json } from 'express';



const PORT = process.env.PORT || 3001;
const app = express();



app.use(json())


// const userRouter = require('./routes/userRouter');
// const conversationRouter = require('./routes/conversationRouter');
// const messageRouter = require('./routes/messageRouter');

// app.use('/user', userRouter);
// app.use('/conversation', conversationRouter);
// app.use('/message', messageRouter);



app.listen(PORT, () => {
    console.log(`Прослушивает на порту ${PORT}`);
});