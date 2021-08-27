const Chat = require('../../../models/Chat');


const getAll = (req, res) => {
    Chat.find({ "user": "randomNaam" }, (err, docs) => {
        if (!err) {
            res.json({
                "status": "success",
                "data": {
                    "chats": docs
                }
            });
        }
    });
}

const create = (req, res, next) => {
    let chat = new Chat();
    chat.text = req.body.text;
    chat.user = req.body.user;
    chat.save((err, doc) => {
        if (err) {
            res.json({
                "status": "error",
                "message": "Could not send message"
            });
        }
        if (!err) {
            res.json({
                "status": "success",
                "data": {
                    "chats": doc
                }
            });
        }
    })


}

module.exports.getAll = getAll;
module.exports.create = create;