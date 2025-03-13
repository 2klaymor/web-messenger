import 'dotenv/config';
import express, { json } from 'express';


const PORT = process.env.PORT || 3001;
const app = express();


app.use(json())



app.listen(PORT, () => {
    console.log(`Прослушивает на порту ${PORT}`);
});