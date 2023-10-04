const mongoose = require('mongoose')
const { options } = require('../routes/posts')

const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },

    category:{
        type: String,
        require: false,
        default: "General"
    },

    cover:{
        type: String,
        require: false,
        default: "https://it.images.search.yahoo.com/search/images;_ylt=AwrkODvl2RplgTM1d0Dc5olQ;_ylu=Y29sbwNpcjIEcG9zAzEEdnRpZAMEc2VjA3Nj?p=logo+goolgl&fr=mcafee"
    },

    author:{
        type: String,
        required: true
    },

    price:{
        type: Number,
        require: true,
        default: 0
    },

    rate:{
        type: Number,
        required: false
    }

}, { timestamps: true, strict: true })

module.exports = mongoose.model('postModel', PostSchema, 'posts')