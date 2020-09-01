const movieService = require('../services/moviesService/index');

saveMovieCOntroller = (req, res, next) => {
	let userId = req.params.userId;
	movieService.saveMovieService.saveMovie(req.body, res, userId)
}

async function streamMovieCOntroller(req, res, next) {
	movieService.saveMovieService.playMovieTorrent(res, req)
}


saveCommentCOntroller = (req, res, next) => {
	movieService.saveMovieCommentService.saveMovieComment(req.body, res)
}

getCommentCOntroller = (req, res, next) => {
	let movieId = req.params.movieId;

	movieService.saveMovieCommentService.getMovieComment(movieId, res)
}

getCOntroller = (req, res, next) => {
	let userId = req.params.userId;

	movieService.saveMovieCommentService.getUserViews(userId, res)
}

module.exports = {
	getCOntroller,
	getCommentCOntroller,
	saveCommentCOntroller,
	saveMovieCOntroller,
	streamMovieCOntroller
}