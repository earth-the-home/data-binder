'use strict'
var logger = require('log4js').getLogger('open1'),
transform = require('readable-stream').Transform,
fs = require('fs'),
path = require('path');
require('util').inherits(DataBindTransform, transform);

function DataBindTransform(options) {
	if (!(this instanceof DataBindTransform)) {
		return new DataBindTransform();
	}
	transform.call(this, options);
	this.dataArray = options;
}
DataBindTransform.prototype._transform = function (chunk, env, cb) {
	this.push(bindAll(chunk.toString(), this.dataArray));
	cb();
}
exports.bindToDestinationFile = function bindToDestinationFile(filePath, dataArray, destFilePath, callback) {
	if (typeof destFilePath === 'string' && typeof filePath === 'string' && dataArray instanceof Array) {
		var custTransform = new DataBindTransform(dataArray);
		var dest = fs.createWriteStream(path.normalize(destFilePath));
		var data = fs.createReadStream(path.normalize(filePath));
		dest.on('error', err => {
				logger.error('Method name : [bindToDestinationFile], Could not pipe data to detination file, please verify the detination file');
				return callback && callback(true);
			});
		data.on('error', err => {
				logger.error('Method name : [bindToDestinationFile], Could not bind data to file path [' + filePath + '], please verify the source file');
				return callback && callback(true);
			});
		data.on('open', dt => {
				logger.info('Method name : [bindToDestinationFile], the data binding to file path [' + filePath + '] has been done successfully');
				return data.pipe(custTransform).pipe(dest);
			});

	} else {
		logger.error('Method name : [bindToDestinationFile], Could not bind data due to improper arguments [' + arguments + '], please refer documentation');
		return callback && callback(true);
	}

}
exports.bindToWriteStream = function bindToWriteStream(filePath, dataArray, dest, callback) {
	if (dest !== undefined && dest.constructor.name === "WriteStream" && typeof filePath === 'string' && dataArray instanceof Array) {
		var custTransform = new DataBindTransform(dataArray);
		var data = fs.createReadStream(path.normalize(filePath));
		dest.on('error', err => {
				logger.error('Method name : [bindToWriteStream], Could not pipe data to WriteStream object, please verify the WriteStream object');
				return callback && callback(true);
			});
		data.on('error', err => {
				logger.error('Method name : [bindToWriteStream], Could not bind data to file path [' + filePath + '], please verify the source file');
				return callback && callback(true);
			});
		data.on('open', dt => {
				logger.info('Method name : [bindToWriteStream], the data binding to file path [' + filePath + '] has been done successfully');
				return data.pipe(custTransform).pipe(dest);
			});

	} else {
		logger.error('Method name : [bindToWriteStream], Could not bind data due to improper arguments [' + arguments + '], please refer documentation');
		return callback && callback(true);
	}

}

exports.bindToResponse = function bindToResponse(filePath, dataArray, res, callback) {
	if (res !== undefined && res.constructor.name === "ServerResponse" && typeof filePath === 'string' && dataArray instanceof Array) {
		var custTransform = new DataBindTransform(dataArray);
		var data = fs.createReadStream(path.normalize(filePath));
		data.on('error', err => {
				logger.error('Method name : [bindToResponse], Could not bind data to file path [' + filePath + '], please verify the source file');
				return callback && callback(true);
			});

		res.on('error', err => {
				logger.error('Method name : [bindToResponse], Could not pipe data to Response object, please verify the Response object');
				return callback && callback(true);
			});
		data.on('open', dt => {
				logger.info('Method name : [bindToResponse], the data binding to file path [' + filePath + '] has been done successfully');
				return data.pipe(custTransform).pipe(res);
			});

	} else {
		logger.error('Method name : [bindToResponse], Could not bind data due to improper arguments, please refer documentation');
		return callback && callback(true);
	}
}

var bindAll = function bindAll(htmlContent, dataArray) {
	if (dataArray instanceof Array && typeof htmlContent === 'string') {
		for (var prop in dataArray)
			if (dataArray.hasOwnProperty(prop))
				htmlContent = htmlContent.split('${' + prop + '}').join(dataArray[prop]);
		return htmlContent;
	} else {
		return htmlContent;
	}

}