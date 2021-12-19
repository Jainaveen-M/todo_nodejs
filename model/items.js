const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    }
},{timeStamps:true});
const item = mongoose.model('item',itemSchema);

module.exports = item;