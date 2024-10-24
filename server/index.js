const express = require('express');

const PORT = 3001;

const app = express();


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

app.get('/api', (req, res) => {
    res.json({ msg: 'test' });
});