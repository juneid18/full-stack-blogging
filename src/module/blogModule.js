import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    userid: {
        type: String,
        require: [true, "token is not provided"]
    },
    username: {
        type: String,
        require: [true, "username is not provided"]
    },
    title: {
        type: String,
        require: [true, "please provide title"]
    },
    content: {
        type: String,
        require: [true, "please provide content for blog"]
    },
    tag: {
        type: String,
        require: [true, "please provide tag"]
    },
    publishedAt: {
        type: Date,
        default: Date.now
    },
    image: {
        type:String,
        require: [true, "please provide image "]
    }
})

const Blog = mongoose.models.blog || mongoose.model('blog', BlogSchema)

export default Blog;