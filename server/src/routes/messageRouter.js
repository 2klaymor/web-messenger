const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController');

router.get('/:id', () => {
    console.log('test3')
})

module.exports = router;