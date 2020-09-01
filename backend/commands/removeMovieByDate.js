const View = require('../api/models/views');
const Movie = require('../api/models/movie');
const moment = require('moment');

getMoviesIdByDate = () => {
    return new Promise((resolve, reject) => {
        var start = new Date();
        start.setDate(1);
        start.setMonth(start.getMonth() - 1);
        start = start.toISOString().substring(0, 10);

        var end = new Date();
        end.setDate(2);
        end.setMonth(end.getMonth() - 1);
        end = end.toISOString().substring(0, 10);

        View.find({
            dateOfLastUpdate: { $gte: start, $lte: end }
        }).select('movieId')
            .exec()
            .then(ids => {
                let i = 0;
                let idsData = []
                if (ids.length > 0) {
                    while (i < ids.length) {
                        idsData.push(ids[0].movieId);
                        i++;
                    }
                }
                resolve(idsData);
            }).catch(err => console.log("getMoviesIdByDate ERR :", err))
    })
}

removeMovies = (movieIds) => {
    return new Promise((resolve, reject) => {
        Movie.deleteMany({
            torrent_id : {
                $in: [movieIds]
            },
        }, function (err) {
            if (err) console.log("removeAllOldAccessToken Err : ", err);
            View.deleteMany({
                movieId : {
                    $in: [movieIds] 
                },
            }, function (err) {
                if (err) console.log("removeAllOldAccessToken Err : ", err);
                console.log("All movies not viewed one months ago has been removed !");
                resolve(true);
            })
        })
    })
}

async function removeMovieByDate() {
    try {
        // get all views not updated from one month ago.App
        let OldMovies = await getMoviesIdByDate();
        // I fthere are ids find and delete by id
        if (OldMovies.length > 0)
            await removeMovies(OldMovies)
    } catch (err) {
        console.log("Sorry an error occured ! removeMovieByDate ", err)
    }
}

module.exports = {
    removeMovieByDate
}