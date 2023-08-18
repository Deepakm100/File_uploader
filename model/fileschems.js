const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    fieldname: {
        type:String
    },
    originalname: String,
    encoding:String,
    mimetype:String,
    filename:String,
})

const File = mongoose.model('File',fileSchema)

module.exports = File