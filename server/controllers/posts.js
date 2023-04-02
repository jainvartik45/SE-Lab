const postMessage = require('../models/postMessage.js')
const express = require('express');
const mongoose = require('mongoose');



const getSamples = async (req, res) => { 
    try {
        const postMessages = await postMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await postMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const getPostsBySearch= async (req,res)=>{
    const {searchQuery , tags} = req.query;
    try {
       const title = new RegExp(searchQuery , 'i');

       const posts = await postMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

       res.json({ data: posts });
    } catch (e) {
        res.status(404).json({ message: e.message });
    }
}

const createPost= async (req,res)=>{
    const post = req.body;

    const newPostMessage = new postMessage({...post , creator : req.userId , createdAt : new Date().toISOString() })
            
    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage)
    } catch (e) {
        res.status(409).json({ message: e.message });
    }
}

const upload= async (req,res)=>{
    const post = req.body;

    const newPostMessage = new postMessage({...post , creator : req.userId , createdAt : new Date().toISOString() })
            
    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage);
    } catch (e) {
        res.status(409).json({ message: e.message });
    }
}

const getSample= async (req,res)=>{
    const {id} = req.params;
    
    
            
    try {
        const sample = await postMessage.findById(id);
       
        res.status(200).json(sample);
    } catch (e) {
        res.status(409).json({ message: e.message });
    }
}

const updatePost = async (req,res)=>{
    // const {id : _id} = req.params;
    // const post = req.body;

    // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    // const updatedPost = await postMessage.findByIdAndUpdate(_id , post , {new : true})

    

    // res.json(updatedPost);

    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await postMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

const deletePost = async (req,res)=>{
    
    const { id } = req.params;
    
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    

    await postMessage.findByIdAndRemove(id);

    res.json({message : 'Post Deleted Successfully'});
    
}


const likePost = async (req,res)=>{
    
    const  {id}  = req.params;
    
    if(!req.userId) return res.json({message : 'Unauthenticated'})
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    

    const post = await postMessage.findById(id);
    
    const index = post.likeCount.findIndex((id) => id === String(req.userId));
    console.log(index)
    if (index ===-1) {
         
        post.likeCount.push(req.userId); 
       
      } else {
        post.likeCount = post.likeCount.filter((id) => id !== String(req.userId));
      }

    const updatedPost = await postMessage.findByIdAndUpdate(id, post, { new: true });
    

    
    res.json(updatedPost);
}

const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await postMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await postMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};


module.exports = {getSamples,upload,updatePost,deletePost,likePost,getPostsBySearch,getPost , commentPost,getSample};