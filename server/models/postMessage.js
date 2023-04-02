const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    name:String,
    
    creator:String,
    
    selectedFile: String,
    description:String,
     
    SubmitedAt: {
        type: Date,
        default: new Date(),
    },
})

var postMessage = mongoose.model('postMessage', postSchema);

module.exports = postMessage;