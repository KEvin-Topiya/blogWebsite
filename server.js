const express=require("express")
const mongoose=require("mongoose")
const articalRouter=require("./routes/artical")
const Artical =require("./models/artical")
const methodoverride=require("method-override")

const app=express();

mongoose.connect( `mongodb+srv://cobow27588:Abcd1234@cluster0.xh5lj.mongodb.net/Articals`),


app.set('view engine','ejs')

app.use(express.urlencoded({extended:false}))

app.use(methodoverride('_method'))
app.get("/",async(req,res)=>{
    const artical=await Artical.find()
    res.render("articals/index",{artical:artical})
})


app.use("/articals",articalRouter)

app.listen(8090)