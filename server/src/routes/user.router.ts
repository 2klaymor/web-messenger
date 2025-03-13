import express from 'express';

const router = express.Router();


// Публичные роуты
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.get('/check-username/:username', userController.checkUsernameAvailability);

// Приватные роуты
router.use(authToken);

router.get('/profile', userController.getCurrentUser);
router.post('/profile', userController.updateCurrentUser);
router.put('/profile/password', userController.updateCurrentUserPassword);

router.get('/search', userController.searchUsers);
router.get('/:userId', userController.getUserById);

router.get('/contacts', userController.getUserContacts);
router.post('/contacts', userController.addContact);
router.put('/contacts/:contactId', userController.updateContact);
router.delete('/contacts/:contactId', userController.removeContact);
router.put('/contacts/:contactId/block', userController.blockContact);
router.put('/contacts/:contactId/unblock', userController.unblockContact);

router.get(':userId/last-seen', userController.getUserLastSeen);