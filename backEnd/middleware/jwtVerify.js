const jwt = require('jsonwebtoken');

const jwtVerify = (req, res, next) => {
    // Get the patient from the jwt token and add id to req object
    try {
        const token = req.header('Authorization');
        if (!token) {
            res.status(401).send({ error: "Please authenticate using a valid token" })
        }
        let finalToken = token.split(" ")
        const data = jwt.verify(finalToken[1], "mySecret");
        req.patient = data;
        return next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}


module.exports = jwtVerify;
