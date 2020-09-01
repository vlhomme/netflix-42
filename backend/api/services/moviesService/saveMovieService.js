const Movie = require('../../models/movie');
const View = require('../../models/views');
const movieClass = require('../../classes/movieClass');
let AbnTorrent = require('abntorrent')
const mongoose = require('mongoose');
const yifysubtitles = require('@amilajack/yifysubtitles');

let client = new AbnTorrent();

let stats = {
	progress: 0,
	downloadSpeed: 0,
	ratio: 0
}

let error_message = "";

client.on('error', function (err) {
	error_message = err.message;
});

client.on('done', function () {
	console.log('torrent download finished')
})

client.on('download', function (bytes) {
	stats = {
		progress: Math.round(client.progress * 100 * 100) / 100,
		downloadSpeed: client.downloadSpeed,
		ratio: client.ratio
	}
	console.log("Stats :", stats);
});

async function movieExist(torrentId) {
	return new Promise((resolve, rejct) => {
		Movie.find(
			{
				torrent_id: torrentId
			}
		).then(usr => {
			resolve(usr)
		}).catch(err => {
			throw new err;
		})
	})
}


async function viewExist(torrentId, userId) {
	return new Promise((resolve, rejct) => {
		View.find(
			{
				movieId: torrentId,
				userId: userId,
			}
		).then(usrViews => {
			resolve(usrViews)
		}).catch(err => {
			throw new err;
		})
	})
}

saveSubtitles = (subTitles, movieSaved) => {
	return new Promise((resolve, reject) => {
		if (subTitles.length > 0) {
			// update
			movieSaved.subTitlesArr = subTitles;
			Movie.findByIdAndUpdate(movieSaved._id,
				movieSaved, {
					new: true,
				},
				function (err, results) {
					if (err) console.log("errot :", err);
					console.log("Movie subTitles updated")
				});
		}
		resolve(true);
	})
}

async function saveMovie(data, res, userId) {
	// check if view exist 
	let views = await viewExist(data.id, userId);
	if (views.length > 0) {
		// if exist update date
		views[0].dateOfLastUpdate = Date.now;
		View.findByIdAndUpdate(views[0]._id,
			views[0], {
				new: false,
			},
			function (err, results) {
				if (err) return res.status(500).json(err);
				console.log("|========== View updated =================|");
			})
	} else {
		// Save view if new
		let viewClass = {
			_id: new mongoose.Types.ObjectId,
			movieId: data.id,
			userId: userId,
		};
		let savevNewView = new View(viewClass);
		savevNewView.save();
		console.log("|================ New view saved ==================|");
	}

	// check if movie exist
	let movie = await movieExist(data.id);
	if (movie.length > 0 && movie[0].compelition === 1) {
		res.status(200).json({
			code: 200,
			data: {
				videoUrlLink: movie[0]._id,
				subTitlesArr: movie[0].subTitlesArr
			}
		})
	} else if (movie.length === 0) {
		//save torren
		let magnet = `magnet:?xt=urn:btih:${data.torrents[0].hash}&dn=${data.title_long}%20%5BWEBRip%5D%20%5B${data.torrents[0].quality}%5D%20%5BYTS.LT%5D&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce`;

		let newMovie = new Movie(await movieClass.saveMovieMockup(data, magnet))
		newMovie.save()
			.then(async movieSaved => {
				//Use imdb_code to download subtitles
				let subTitles = await yifysubtitles(movieSaved.imdb_code, { path: '/usr/src/app/uploads', langs: ['en', 'fr', 'ar', 'zh', 'it', 'ru', 'es', 'uk'] });
				console.log("subTitles :", subTitles);
				await saveSubtitles(subTitles, movieSaved);
				//magnet:?xt=urn:btih:TORRENT_HASH&dn=Url+Encoded+Movie+Name&tr=http://track.one:1234/announce&tr=udp://track.two:80
				client.add(magnet, { path: '/usr/src/app/uploads' }, function (torrent) {

					let files = [{
						name: data.name,
						length: data.length
					}];

					var file = torrent.files.find(function (file) {
						return file.name.endsWith('.mp4')
					})

					if (torrent.files)
						torrent.files.forEach(function (data) {
							files.push({
								name: data.name,
								length: data.length
							});

						});

					if (file !== undefined) {
						let movieUrl = 'uploads/' + file.path;
						var encodeMagnet = encodeURI(magnet);
						var encoeName = encodeURI(file.name);

						let videoUrlLink = `/stream/${encodeMagnet}/${encoeName}`;

						movieSaved.videosUrl = movieUrl;
						movieSaved.videoName = file.name;

						Movie.findByIdAndUpdate(movieSaved._id,
							movieSaved, {
								new: true,
							},
							function (err, results) {
								if (err) console.log("errot :", err);
								console.log("Movie url updated")
							});
					}

					client.on('do	ne', function () {
						console.log('torrent download finished')
						movieSaved.compelition = 1;
						Movie.findByIdAndUpdate(movieSaved._id,
							movieSaved, {
								new: true,
							},
							function (err, results) {
								if (err) console.log("errot :", err);
								console.log("Movie updated")
							});
					})

					res.status(200).json({
						code: 200,
						data: {
							videoUrlLink: movieSaved._id,
							subTitlesArr: movieSaved.subTitlesArr
						}
					})
				})
			}).catch(err => {
				console.log("saveMovie :", err)
			})

	} else {
		let magnet = `magnet:?xt=urn:btih:${data.torrents[0].hash}&dn=${data.title_long}%20%5BWEBRip%5D%20%5B${data.quality}%5D%20%5BYTS.LT%5D&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce`;
		//magnet:?xt=urn:btih:TORRENT_HASH&dn=Url+Encoded+Movie+Name&tr=http://track.one:1234/announce&tr=udp://track.two:80
		client.add(magnet, { path: '/usr/src/app/uploads' }, function (torrent) {

			let files = [];

			var file = torrent.files.find(function (file) {
				return file.name.endsWith('.mp4')
			})

			torrent.files.forEach(function (data) {
				files.push({
					name: data.name,
					length: data.length
				});

			});

			// let movieUrl = 'uploads/' + file.path;
			// var encodeMagnet = encodeURI(magnet);
			// var encoeName = encodeURI(file.name);

			// let videoUrlLink = `/stream/${encodeMagnet}/${encoeName}`;

			client.on('done', function () {
				console.log('torrent download finished')
				movie[0].compelition = 1;
				Movie.findByIdAndUpdate(movie[0]._id,
					movie[0], {
						new: true,
					},
					function (err, results) {
						if (err) console.log("errot :", err);
						console.log("Movie updated")
					});
			})

			res.status(200).json({
				code: 200,
				data: {
					videoUrlLink: movie[0]._id,
					subTitlesArr: movie[0].subTitlesArr
				}
			})
		})
	}
	global.clientTor = client;
}


async function movieExistTor(torrentId) {
	return new Promise((resolve, rejct) => {
		Movie.find(
			{
				_id: torrentId
			}
		).then(usr => {
			resolve(usr)
		}).catch(err => {
			console.log("errror : ", err);
		})
	})
}

async function playMovieTorrent(res, req) {
	let torrentId = req.params.torrentId;

	if (torrentId.length > 6) {
		let movie = await movieExistTor(torrentId);

		let magnet = movie[0].magnetUrl;

		var tor = client.get(magnet);

		let file = {};

		if (tor && tor.files !== null) {
			for (i = 0; i < tor.files.length; i++) {
				if (tor.files[i].name == movie[0].videoName) {
					file = tor.files[i];
				}
			}
		}

		let range = req.headers.range;

		console.log("Range value ==================> | => , ", range);

		if (!range) {
			let err = new Error("Wrong range");
			err.status = 416;
			return next(err);
		}
		let positions = range.replace(/bytes=/, "").split("-");

		let start = parseInt(positions[0], 10);
		let file_size = file.length;
		let end = positions[1] ? parseInt(positions[1], 10) : file_size - 1;

		let chunksize = (end - start) + 1;

		let head = {
			"Content-Range": "bytes " + start + "-" + end + "/" + file_size,
			"Accept-Ranges": "bytes",
			"Content-Length": chunksize,
			"Content-Type": "video/mp4"
		}

		res.writeHead(206, head);

		let stream_position = {
			start: start,
			end: end
		}

		// if (file && range !== 'bytes=0-') {
		if (isEmpty(file)) {
			let stream = file.createReadStream(stream_position)
			stream.pipe(res);
			stream.on("error", function (err) {
				return next(err);
			});
		}

	} else {
		res.status(206);
	}
}

function isEmpty(obj) {
	let i = 0;
	for(var prop in obj) {
	  if(obj.hasOwnProperty(prop)) {
			i++;
	  }
	}
	if (i !== 0)
		return true;
	else 
		return false;
}
  

module.exports = {
	saveMovie,
	playMovieTorrent
}