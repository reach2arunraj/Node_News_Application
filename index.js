const express = require("express")
const app = express()
const apiRouter = require("./routes/api")
const bodyParser = require('body-parser')
const mongoose = require("mongoose")

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/api", apiRouter)

// DB Config
const db = require("./config/keys").MongoURI

//Connect Mongo
mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true })
.then(()=> console.log("Mongoo DB Connected..."))
.catch(err => console.log(err))


app.get("/", (req,res)=>{
    res.render("home")
})


app.listen(process.env.PORT||3000, ()=> console.log(`Server is running...`))

