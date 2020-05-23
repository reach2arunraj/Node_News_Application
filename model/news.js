const mongoose = require("mongoose")

const newsSchema = new mongoose.Schema({
    author:{
        type:String,
    },
    title:{
        type:String,  
    },
    description:{
        type:String,
    },
    publishedAt:{
        type:Date,
    },
    urlToImage:{
        type:String,  
        unique:true,
    },
    category:{
        type:String,
    }
})

module.exports = mongoose.model("News", newsSchema)