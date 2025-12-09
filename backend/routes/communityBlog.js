const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const CommunityBlog = require('../models/CommunityBlog')

//get all posts
router.get('/scena_voastra', async (req, res) => {
    try {
        const postari = await CommunityBlog.find()
        res.json(postari)
    } catch (error) {
        res.status(500).send(error);
    }
})

//post a post

router.post('/scena_voastra', async (req, res) =>{
    try {
        const newPost = new CommunityBlog({
            _id: new mongoose.Types.ObjectId(),
            postID: Math.floor(Math.random() * 1000000),
            titlu: req.body.titlu,
            nume: req.body.nume,
            mail: req.body.mail,
            data: new Date(),
            post: req.body.post,
            comentarii: []
        })
        const savedPost = await newPost.save()
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//DELETE A POST
router.delete('/communitypost/delete/:_id', async (req, res) => {
    const postId = req.params._id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).send('Invalid ID format');
    }
  
    try {
      const result = await CommunityBlog.findByIdAndDelete(postId);
  
      if (!result) {
        return res.status(404).send('Post not found');
      }
  
      res.status(200).send('Post deleted');
    } catch (error) {
      console.error(error); 
      res.status(500).send('Server error');
    }
});

//post a comment
router.post('/scena_voastra/comentarii/:postID', async (req, res) =>{
    const {postID, comentariu, autor, mail} = req.body
    // const {postID} = req.params
    const newComment = {
        postID: postID,
        comentariu: comentariu,
        autor: autor,
        mail: mail,
        data: new Date()
    }
    try {
        const updatedPost = await CommunityBlog.findOneAndUpdate(
            {postID: Number(postID)},
            { $push: { comentarii: newComment } },
            { new: true, safe: true, upsert: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//DELETE A COMMENT
router.delete('/scena_voastra/:postID/comentarii/:commentId', async (req, res) => {
    const {postID, commentId} = req.params

    try {
        const updated = await CommunityBlog.findOneAndUpdate(
            {postID: Number(postID)},
            {$pull: {comentarii : {_id: commentId}}},
            {new: true}
        )
        if(!updated) return res.status(404).json({message: 'Post not found'})
        return res.status(200).json({
           message: "Cometariu sters cu suces",
           comentarii: updated.comentarii
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;