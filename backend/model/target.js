const mongoose = require('mongoose')

const TargetSchema = new mongoose.Schema({
    name:String,
    top:Number,
    left:Number,
    right:Number,
    bottom: Number
})

const target = mongoose.model('Target',TargetSchema)
module.exports = target