const mongoose = require('mongoose')

const RankSchema = new mongoose.Schema({
    name:{type:String,default:'anonymous'},
    useTime: String
})

const rank = mongoose.model('Rank',RankSchema)
module.exports = rank