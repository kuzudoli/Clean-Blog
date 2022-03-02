const Post = require("../models/Posts")

//Index
exports.getIndex = async(req,res)=>{
    const posts = await Post.find({}).sort("-dateCreated");//Get data for render
    res.render("index",{
        posts
    });
};

//About
exports.getAbout = (req,res)=>{
    res.render("about");
};