const express = require("express")
const router = express.Router()
const apikey = require("../config/keys").apikey
const axios = require('axios')
const News = require("../model/news")
const mongoose = require("mongoose")

router.get("/fetch-news", (req,res) => {
    res.render("apifetch")
})

router.get("/categories", async (req,res) => {
    const news = await News.find().sort({publishedAt:"desc"})
    res.render("display", { news:news})
})

router.get("/list-news", (req, res) => {
    res.render("dbfetch")
})


router.post("/list-news", async (req,res)=>{
    const  { fromdate, todate, category } = req.body
    const filteredArray = [];
    const news = await News.find({"publishedAt": {"$gte": fromdate, "$lt": todate}}).sort({publishedAt:"desc"})
    news.filter( element => {
        if(category.includes(element.category)){
            filteredArray.push(element)
        }
    })
    res.render("display", { news:filteredArray})
})

router.post("/", async (req,res)=>{
    const  { fromdate, todate, category } = req.body
    for( i in category){
    const { data: { articles }} = await axios.get(`https://newsapi.org/v2/everything?q=${category[i]}&from=${fromdate}&to=${todate}&sortBy=publishedAt&apiKey=${apikey}`)

    try{
        
    for( j in articles){
    let edit = articles[j].publishedAt
    let news = new News ({
        author: articles[j].author,
        title: articles[j].title,
        description: articles[j].description,
        publishedAt: new Date (edit),
        urlToImage: articles[j].urlToImage,
        category: category[i]
        
    })
    await news.save()
    }

    }
    catch(e){
        console.log(e)
    }
}
res.render("useroption")
})

module.exports = router