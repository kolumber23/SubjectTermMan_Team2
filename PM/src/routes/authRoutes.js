require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const fakeUserID = 1;

    if (username && password) {
        // Generate a token only after successful authentication
        const token = jwt.sign(
            { userId: fakeUserID },
            process.env.JWT_SECRET,
            { expiresIn: '24h' } 
        );

        res.json({
            message: "Authentication successful",
            token: token
        });
    } else {
        res.status(400).json({ message: "Authentication failed. Please check the request" });
    }
});

module.exports = router;
