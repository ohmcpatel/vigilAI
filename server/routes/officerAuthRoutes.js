// officerAuthRoutes.js

const express = require('express');
const admin = require('../config/firebase-config');

const router = express.Router();

// Signup logic for officer users
router.post('/officer/signup', async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await admin.auth().createUser({
            email,
            password,
        });

        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});


// Signin logic for officer users
router.post('/officer/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userCredential = await admin.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});


// Middleware for officer authentication verification
const authenticateOfficerUser = async (req, res, next) => {
    const idToken = req.headers.authorization;

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        return next();
    } catch (error) {
        return res.status(401).send('Unauthorized');
    }
};

// Endpoint accessible only to authenticated officer users
router.get('/officer/protected-route', authenticateOfficerUser, (req, res) => {
    res.status(200).send('Access granted to officer user');
});


module.exports = router;
