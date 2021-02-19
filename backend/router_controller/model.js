const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Meme = new Schema(
    {
		id:{type:Number},
        name: { type: String, required: true },
        caption: { type: String, required: true },
        url: { type: String, required: true },
    },
    { timestamps: true })


module.exports = mongoose.model('memes', Meme)
