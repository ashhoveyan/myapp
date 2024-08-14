import models from "../models/user.js";
import md5 from "md5";
import cryptoJS from "crypto-js";
import user from "../models/user.js";
import createHttpError from "http-errors";


export default {
    async getUsersList(req, res,) {
        try {
            const users = await models.getUsersList()
            res.status(200).render('users', { users });
        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    },
    async register(req, res) {
        try {
            // const {
            //     firstName,
            //     lastName,
            //     email,
            //     password
            // } = req.body;
            //
            //
            // const lowerCaseEmail = email.toLowerCase();
            // const hashedPassword = md5(md5(password)  + process.env.SECRET);
            // const result = await models.createUser({
            //     firstName,
            //     lastName,
            //     lowerCaseEmail,
            //     hashedPassword
            // });
            //
            // if (result) {
            //     res.status(200).render('register',{
            //         message: 'User created successfully',
            //         userEmail: lowerCaseEmail
            //     });
            //     return
            // }
            // res.status(401).json({
            //     message: result
            // });

            const {firstName,lastName, email, password} = req.body;

            const emailUsed = await models.getProfile(email);

            if (emailUsed) {
                throw new createHttpError(422, "email already exists");
            }
            const {newUser} = await models.registration({firstName,lastName, email, password});
            res.json({newUser});

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    },
    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const hash = cryptoJS.AES.encrypt(JSON.stringify({
                email,
            }), process.env.SECRET).toString();
            console.log(hash)

            const lowerCaseEmail = email.toLowerCase()
            const result = await models.login({ lowerCaseEmail, password })

            if (!result.success) {
                res.status(401).json({
                    message: user.message
                });
                return;
            }

            res.status(200).json({
                message: 'Login successful',
                token: hash,
                user: result.user
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }

    },
    async getProfile(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(422).render('profile', {
                    title: 'User Profile',
                    user: []
                });
            }

            const user = await models.getProfile({ id });

            if (!user || !user.success) {
                return res.status(401).render('profile', {
                    title: 'User Profile',
                    user: []
                });
            }

            res.render('profile', {
                title: 'User Profile',
                user: user.rows
            });
        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    },
    async updateProfile(req, res) {
        try {
            const {
                fName,
                lName,
                email,
                password,
                id
            } = req.body;

            const hashedPassword = md5(md5(password)  + process.env.SECRET);
            const lowerCaseEmail = email.toLowerCase()

            const result = await models.updateUserProfile({
                fName,
                lName,
                lowerCaseEmail,
                hashedPassword,
                id
            })

            if (!result.success) {
                res.status(401).render('update', {
                    message: result.message
                });
                return;
            }
            res.status(200).render('update', {
                title: 'User Updated',
                message: 'Update User successfully!',
                id: id
            });
        } catch (error) {
            console.error('Internal Server Error:', error);
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    },
    async deleteProfile(req, res) {
        try {
            const { id } = req.params;

            const user = await models.deleteProfile({ id });
            if (!user.success) {
                res.status(401).render('profile', {
                    title: 'User Profile',
                    message: user.message,
                    user: []
                });
                return;
            }
            res.status(200).render('profile', {
                title: 'User Deleted!',
                message: 'User successfully deleted!',
                user: user
            });

        } catch (error) {
            console.error('Internal Server Error:', error);
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    }


}
