var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, "please enter your comment!"]
    },
    commentBy: {
        user_id: mongoose.Schema.Types.ObjectId,
        name: {
            type: String,
            required: true
        }
    },
    commentedOn: {
        type: Date,
        default: Date.now
    }
});

var blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "A title must be provided for blog creation!"]
    },
    preview: String,
    content: {
        type: String,
        required: [true, "Content must be provided for blog creation!"]
    },
    totalLikes: Number,
    categories: [String],
    author: {
        author_id: mongoose.Schema.Types.ObjectId,
        name: String
    },
    comments: [commentSchema],
    createdOn: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Blog', blogSchema);