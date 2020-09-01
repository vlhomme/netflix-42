const mongoose = require('mongoose');
const Comment = require('../../models/comments');
const View = require('../../models/views');

async function commentClass(data) {
    return new Promise((resolve, reject) => {
        resolve({
            _id: new mongoose.Types.ObjectId,
            movieId: data.movieId,
            userId: data.userId,
            userImage: data.userImage,
            commentContent: data.commentContent,
            userFullName: data.userFullName,
            dateOfCreation: data.dateOfCreation,
        })
    })
}


async function saveMovieComment(data, res) {
    try {
        let comments = new Comment(await commentClass(data));
        comments.save()
            .then(res => {
                res.status(200).json({
                    msg: "Msg saved",
                    code: 200
                })
            }).catch(Err => {
                res.status(200).json({
                    msg: "Sorry an error occured",
                    code: 500
                })
            })
    } catch (err) {
        console.log("saveMovieComment ERROR :", err)
        res.status(200).json({
            msg: "Sorry an error occured",
            code: 500
        })
    }
}

async function getMovieComment(movieId, res) {
    Comment.find({
        movieId: movieId,
    }).sort('dateOfCreation')
    .exec()
    .then(comments => {
        res.status(200).json({
            code: 200,
            msg: "Comments fetched.",
            data: comments
        })
    }).catch(err => {
        res.status(200).json({
            msg: "Sorry an error occured",
            code: 500
        })
    })
}

getUserViews = (userId, res) => {
    console.log("userId :", userId);
    View.find({
        userId: userId
    }).exec()
    .then(views => {
        console.log("views :", views);
        res.status(200).json({
            code: 200,
            msg: "Views ;fetched",
            data: views
        })
    }).catch(err => {
        res.status(200).json({
            code: 500,
            msg: "Sorry an error occured"
        })
    })
}

module.exports = {
    getUserViews,
    saveMovieComment,
    getMovieComment
}