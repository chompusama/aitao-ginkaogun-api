var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var timerSchema = new Schema({
    time: {type: String},
});

/////////  Main schema //////////
var dataSchema = new Schema({
    _id: { type: String },
    timer: [timerSchema],
});

module.exports = mongoose.model('Data', dataSchema);