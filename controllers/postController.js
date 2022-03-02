const Post = require("../models/Posts")

//GET
exports.getCreatePage = (req,res)=>{
    res.render("add_post");
};

exports.getPostPage =  async(req,res)=>{
    const post = await Post.findById(req.params.id);//Get data for render
    //console.log(typeof(post.dateCreated));
    res.render("post",{
        post
    });
};

exports.getEditPage =  async(req,res)=>{
    const post = await Post.findById(req.params.id);//Get data for render
    //console.log(typeof(post.dateCreated));
    res.render("edit_post",{
        post
    });
};

//POST
exports.createPost = async(req,res)=>{
    await Post.create(req.body)
    res.redirect("/");
};

exports.updatePost = async(req,res)=>{
    const post = await Post.findById(req.params.id);
    post.title = req.body.title;
    post.detail = req.body.detail;

    post.save();//Saves changes

    res.redirect(`/posts/${req.params.id}`);
};

exports.deletePost = async(req,res)=>{
    await Post.findByIdAndRemove(req.params.id);
    res.redirect("/");
};