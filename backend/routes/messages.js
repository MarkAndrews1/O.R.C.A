const express = require("express");
const Message = require("../models/message")

const router = express.Router();

router.post("/post", async function (req, res, next) {
    try {
        const data = req.body
        const message = await Message.create(data)
        res.status(201).json(message)
    }catch(err){
        return next(err)
    }
})

router.post("/get", async function (req, res, next) {
    try {
        const data = req.body
        const messages = await Message.getMessages(data)
        return res.json({ messages })
    }catch(err){
        return next(err)
    }
})

module.exports = router;