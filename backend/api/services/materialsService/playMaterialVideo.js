const Material = require('../../models/material');
const utils = require('../utils');
const fs = require('fs');
const path = require("path");



playVideo = (videoPath, res, req) => {
    let file = videoPath;

    //fs.stat(file, (err, stat) => {
    //    let total = stat.size
    //    let progress = 0
    //    let read = fs.createReadStream(file)
    //    read.on('data', (chunk) => {
    //        progress += chunk.length
    //        console.log("J'ai lu " + Math.round(100 * progress / total) + "%")
    //    })
    //})

	fs.stat(file, function(err, stats) {

        if(err)
		{
			if(err.code === 'ENOENT')
				return res.sendStatus(404);
			//return next(err);
			res.status(401);
		}

		let range = req.headers.range;

		if(!range)
		{
			let err = new Error('Wrong range');
				err.status = 416;
			return next(err);
		}
		let positions = range.replace(/bytes=/, '').split('-');
		let start = parseInt(positions[0], 10);
		let file_size = stats.size;
		let end = positions[1] ? parseInt(positions[1], 10) : file_size - 1;
		let chunksize = (end - start) + 1;
		let head = {
			'Content-Range': 'bytes ' + start + '-' + end + '/' + file_size,
			'Accept-Ranges': 'bytes',
			'Content-Length': chunksize,
			'Content-Type': 'video/mp4'
		}
		res.writeHead(206, head);
		let stream_position = {
			start: start,
			end: end
		}
		let stream = fs.createReadStream(file, stream_position)
		stream.on('open', function() {
			stream.pipe(res);
        })
        
        stream.on('close', function() {
			console.log("Closed");
			// stream = fs.createReadStream(file, stream_position)
			// stream.on('open', function() {
			// 	stream.pipe(res);
        	// });
		})

		stream.on('error', function(err) {
			return next(err);
		});
	});
}



module.exports = {
    playVideo
}