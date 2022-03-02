const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const postController = require("./controllers/postController");
const pageController = require("./controllers/pageController");
const app = express();

//Connect DB
mongoose.connect("mongodb+srv://kuzudoli:lBwX5mqCFWhL2KwI@cluster0.yeqq3.mongodb.net/clean-blog-db?retryWrites=true&w=majority")
.then(()=>{
    console.log("DB Connected!");
}).catch((err) => {
    console.log(err);
});

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
app.get('/', pageController.getIndex);
app.get('/about',pageController.getAbout);

app.get('/add_post',postController.getCreatePage);
app.get('/posts/:id',postController.getPostPage);
app.get('/posts/edit/:id',postController.getEditPage);

//POST
app.post("/posts",postController.createPost);
app.put("/posts/:id",postController.updatePost);
app.delete("/posts/:id",postController.deletePost);

//Server
const port = 3278;
app.listen(port,()=>{
    console.log(`${port} Listening...`);
})