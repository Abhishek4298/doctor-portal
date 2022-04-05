const express = require('express');
const router = express.Router();
const passport = require('passport');

// GOogle auth
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

router.get('/google', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});

router.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }
    ));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/google/failure'
    })
);

router.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}`);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye!');
});

router.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
});

module.exports = router;