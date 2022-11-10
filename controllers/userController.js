const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { signJWT } = require("../helpers/jwt");
const { User } = require('../models/index');
const sendMail = require("../helpers/mailer");

class Controller {
    static async register(req, res, next) {
        try {
            const { email, password, username, } = req.body
            const newUser = await User.create({
                email, password, username
            })

            const mail = {
                body: {
                    to: email,
                    subject: "Detak Account Membership",
                    text: "Tankyou for subscribe!",
                    html: `you can freely read news from around the world!`,
                },
            };
            await sendMail(mail)

            res.status(201).json({ "message": "user created!" })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                throw {
                    code: 401,
                    msg: "Email or Password Cannot Be Empty",
                };
            }
            const foundUser = await User.findOne({
                where: {
                    email
                }
            })
            if (!foundUser) {
                throw {
                    code: 401,
                    msg: "invalid Email or Password"
                }
            }

            if (!bcrypt.compareSync(password, foundUser.password)) {
                throw {
                    code: 401,
                    msg: "invalid Email or Password"
                }
            }
            const access_token = signJWT({
                id: foundUser.id
            })
            res.status(200).json({ access_token })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller