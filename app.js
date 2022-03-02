const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Post = require("./models/Posts")

const app = express();

//Connect DB
mongoose.connect("mongodb://localhost/clean-blog-db");

//Template Engine
app.set("view engine","ejs");

//Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))//parses incoming request's body
app.use(express.json())//converts encoded body data to json
app.use(methodOverride('_method',{
    methods:['POST','GET']
}));

//GET
app.get('/', async(req,res)=>{
    const posts = await Post.find({});//Get data for render
    res.render("index",{
        posts
    });
});

app.get('/about',(req,res)=>{
    res.render("about");
});

app.get('/add_post',(req,res)=>{
    res.render("add_post");
});

app.get('/posts/:id', async(req,res)=>{
    const post = await Post.findById(req.params.id);//Get data for render
    //console.log(typeof(post.dateCreated));
    res.render("post",{
        post
    });
});

app.get('/posts/edit/:id', async(req,res)=>{
    const post = await Post.findById(req.params.id);//Get data for render
    //console.log(typeof(post.dateCreated));
    res.render("edit_post",{
        post
    });
});

//POST
//Create
app.post("/posts",async(req,res)=>{
    await Post.create(req.body)
    res.redirect("/");
});

//Update
app.put("/posts/:id",async(req,res)=>{
    const post = await Post.findById(req.params.id);
    post.title = req.body.title;
    post.detail = req.body.detail;

    post.save();

    res.redirect(`/posts/${req.params.id}`);
});

app.delete("/posts/:id",async(req,res)=>{
    await Post.findByIdAndRemove(req.params.id);
    res.redirect("/");
});

//Server
const port = 3278;
app.listen(port,()=>{
    console.log(`${port} Listening...`);
})