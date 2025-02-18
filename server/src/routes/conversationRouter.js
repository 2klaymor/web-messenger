const express = require('express');
const router = express.Router();

const conversationController = require('../controllers/conversationController');

router.get('/:id', () => {
    console.log('test2')
})

module.exports = router;