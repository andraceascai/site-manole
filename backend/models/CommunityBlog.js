const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    postID: Number,
    comentariu: String,
    autor: String,
    mail: String,
    data: String
})

const communityBlogSchema = new mongoose.Schema({
// _id: String,
postID: Number,
titlu: String,
nume: String,
mail: String,
data: String,
post: String,
comentarii: [commentsSchema]
})

const CommunityBlog = mongoose.model('CommunityBlog', communityBlogSchema, 'communityBlog' )

module.exports = CommunityBlog