const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    postID: Number,
    comentariu: String,
    autor: String,
    mail: String,
    data: String
})

const actorBlogSchema = new mongoose.Schema({
// _id: String,
postID: Number,
titlu: String,
data: String,
post: String,
comentarii: [commentsSchema]
})

const ActorBlog = mongoose.model('ActorBlog', actorBlogSchema, 'actorBlog' )

module.exports = ActorBlog;