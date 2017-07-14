# data-binder
to bind dynamic data to web content to send as response 


The Objective is to enable dynamic data binding to html or any text file.
our dynamic data can be added to file by mapping data to variable. variable should be inside curly braces preceeded by $.
Example: 
input data(index.html) :
<html>
	<head>
	<head>
	<body>
		<h2>Hi, ${name} here.<h2>
	<body>
</html>

output data(indexTemp.html) :
<html>
	<head>
	<head>
	<body>
		<h2>Hi, Naveen here.<h2>
	<body>
</html>

Method 1:
Please find below example code to achieve data binding and to get result back in given destination file.
test.js:

'use strict'
var dataBinder = require('data-binder');
var dataArray = [] //Array should be created to add dynamic data and respective keys
dataArray['name'] = "Naveen" //the dynamic data "Naveen" is attached to variable "name"
/*
Method Signature : bindToDestinationfile(sourceFilePath, DynamicDataArray, destinationFilePath, callback(optional))

this method will binds data and reflects the required data in destination file.
*/
dataBinder.bindToDestinationfile("./index.html", dataArray, "./indexTemp.html")


Method 2:
Please find below example code to achieve data binding and to pipe data into given WriteStream.
test.js:

'use strict'
var fs = require('fs'),
	path = require('path'),
	dataBinder = require('data-binder');
var dataArray = [] //Array should be created to add dynamic data and respective keys
dataArray['name'] = "Naveen" //the dynamic data "Naveen" is attached to variable "name"
/*
Method Signature : bindToWriteStream (sourceFilePath, DynamicDataArray, destinationWriteStream, callback(optional))

this method will binds data and pipe the required data into destination WriteStream.
*/
var destinationWriteStream = fs.createWriteStream(path.normalize("./indexTemp.html"));
dataBinder.bindToWriteStream ("./index.html", dataArray, destinationWriteStream)


Method 2:
Please find below example code to achieve data binding and to pipe data into given Response object.
test.js:

'use strict'
var dataBinder = require('data-binder');
var dataArray = [] //Array should be created to add dynamic data and respective keys
dataArray['name'] = "Naveen" //the dynamic data "Naveen" is attached to variable "name"
/*
Method Signature : bindToResponse (sourceFilePath, DynamicDataArray, response, callback(optional))

this method will binds data and pipe the required data into response
*/
dataBinder.bindToResponse ("./index.html", dataArray, response)

Read more at https://github.com/naveento/data-binder

