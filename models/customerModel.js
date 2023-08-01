const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
name:{
type:String,
required: [true, 'A name is required!']

},
timeOfOrder:{
    type: Date,
    required: true,
    default:Date.now
},
satisfactionLevel:{
    type:Number,
    required: true,
    default: 5
}
});

module.exports = mongoose.model('customers',customerSchema);