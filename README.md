
The Objective is to enable dynamic data binding to web content to send as response .

----------
Overview
-------------
All dynamic data can be added to file/response by mapping the required data to variable. 
All variables should be declared inside curly braces preceeded by $ in source file.



>Input data(index.html) :
&lt;html&gt;
	&lt;head&gt;
	&lt;head&gt;
	&lt;body&gt;
		&lt;span&gt;Hi, ${name} here.&lt;span&gt;
	&lt;body&gt;
&lt;/html&gt;

>Expected output(indexTemp.html) :
&lt;html&gt;
	&lt;head&gt;
	&lt;head&gt;
	&lt;body&gt;
		&lt;span&gt;Hi, Naveen here.&lt;span&gt;
	&lt;body&gt;
&lt;/html&gt;

Available methods are as follows :
----
Method 1:
To achieve data binding and to get result back in given destination file.
>'use strict' 
> dataBinder = require('data-binder'); 
>var dataArray = [] //Array should be created to add dynamic data and respective keys  
>dataArray['name'] = "Naveen" //The dynamic data "Naveen" is attached to variable "name" 
>/* method signature : bindToDestinationFile(sourceFilePath, dynamicDataArray, destinationFilePath, callback(optional)) this method will binds data and then reflects the required data in destination file. */ 
>dataBinder.bindToDestinationFile("./index.html",dataArray, "./indexTemp.html") 


Method 2:
To achieve data binding and to pipe data into given WriteStream.
> 'use strict' 
> var fs = require('fs'), 
> path = require('path'), 
> dataBinder = require('data-binder'); 
> var dataArray = [] //Array should be created to add dynamic data and respective keys 
> dataArray['name'] = "Naveen" //The dynamic data "Naveen" is attached to variable "name" 
> /* method signature : bindToWriteStream (sourceFilePath, dynamicDataArray, destinationWriteStream, callback(optional)) this method will binds data and pipe the required data into destination WriteStream. */ 
> var destinationWriteStream = fs.createWriteStream(path.normalize("./indexTemp.html")); 
> dataBinder.bindToWriteStream ("./index.html", dataArray, destinationWriteStream)

Method 3:
To achieve data binding and to pipe data into given Response object.
> 'use strict'  
> var dataBinder = require('data-binder');	 
> var dataArray = [] //Array should be created to add dynamic data and respective keys	 
> dataArray['name'] = "Naveen" //The dynamic data "Naveen" is attached to variable "name"	 
> /* method signature : bindToResponse (sourceFilePath, dynamicDataArray, response, callback(optional)) this method will binds data and pipe the required data into response */		
> dataBinder.bindToResponse ("./index.html", dataArray, response)	
