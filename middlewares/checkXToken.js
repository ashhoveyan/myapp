import cryptoJS from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config();


const checkXToken = (req, res, next) => {
    const token = req.headers['x-token'];

    if (token) {
        try {
            const bytes = cryptoJS.AES.decrypt(token, process.env.SECRET);
            const decryptedData = bytes.toString(cryptoJS.enc.Utf8);

            if (decryptedData) {
                const parsedData = JSON.parse(decryptedData);
                if (parsedData && parsedData.email && parsedData.id) {
                    next();
                } else {
                    res.status(401).send({
                        message: 'Token is not valid',
                    });
                }
            } else {
                res.status(401).send({
                    message: 'Token is not valid',
                });
            }
        } catch (error) {
            res.status(401).send({
                message: 'Token is not valid',
                error: error.message,
            });
        }
    } else {
        res.status(401).send({
            message: 'Unauthorized',
        });
    }
};

export default checkXToken;
