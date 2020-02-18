const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Stonk = new Schema({
    name: {
        type: String
    },
    buy: {
        type: String
    },
    sell: {
        type: String
    },
});

module.exports = mongoose.model('Stock', Stonk);