const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let username = req.body.username;
    let birthday = req.body.birthday;
    let password = req.body.password;

    const user = new User({
        firstname: firstname,
        lastname: lastname,
        username: username,
        birthday: birthday
    });

    await user.setPassword(password);
    await user.save().then(result => {
        console.log(result);

        let token = jwt.sign({
            uid: result._id,
            username: result.username
        }, "MyVerySecretWord")

        res.json({
            "status": "success",
            "data": {
                "token": token
            }
        })
    }).catch(error => {
        res.json({
            "status": "error"
        })
    });
};

const login = async (req, res, next) => {
    const user = await User.authenticate()(req.body.username, req.body.password).then(result => {

        if (!result.user) {
            return res.json({
                "status": "failed",
                "message": "failed to log in"
            });
        }

        let token = jwt.sign({
            uid: result.user._id,
            username: result.user.username
        }, "MyVerySecretWord"); //config.get('jwt.secret')

        return res.json({
            "status": "success",
            "data": {
                "token": token
            }
        });

    }).catch(error => {
        res.json({
            "status": "error",
            "message": error
        })
    });
};

module.exports.signup = signup;
module.exports.login = login;