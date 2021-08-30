const Chat = require('../../../models/Chat');


const getAll = (req, res) => {
    Chat.find({ "user": req.user._id }, (err, docs) => {
        if (!err) {
            res.json({
                "status": "success",
                "data": {
                    "chats": docs //chat of chats? is wel chats in db
                }
            });
        }
    });
}

const create = (req, res, next) => {
    let chat = new Chat();
    chat.text = req.body.text;
    chat.user = req.user._id;
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
                    "chats": doc //chat of chats? is wel chats in db
                }
            });
        }
    })


}

module.exports.getAll = getAll;
module.exports.create = create;