/*jshint node:true*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as it's web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// Use the files out of ./public as our main files for the front end
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

//set the fb var to the facebook.js file
var fb = require("./facebook");

//Notes in README.md on how to retrieve the  group token
var token = '<group_token>';

//The group ID value is retrieved from the home page of the Facebook group
//example: https://www.facebook.com/groups/<group ID value>
var groupID = '<group_ID_value>';
var FeedPath = '/' + groupID + '/feed?';
var InfoPath = '/' + groupID + '/?fields=description&';
var EventPath = '/' + groupID + '/events?fields=name,start_time,location,owner,description&';

app.get('/messages', function(req, res){
    fb.getFbData(token, FeedPath, function(data){
    var FBData = JSON.parse(data);
    res.send(FBData);  
});
  
});

app.get('/info', function(req, res){
    fb.getFbData(token, InfoPath, function(data){
    var FBData = JSON.parse(data);
    res.send(FBData);  
});
  
});

app.get('/events', function(req, res){
    fb.getFbData(token, EventPath, function(data){
    var FBData = JSON.parse(data);
    res.send(FBData);  
});
  
});

//***Used for testing locally (need to uncomment useFBData.js and useEventsFBData.js as well)//
//var server = app.listen(3000, function () {

  //var host = server.address().address;
  //var port = server.address().port;

  //console.log('Example app listening at http://%s:%s', host, port);
//});
//***

// start server on the specified port and binding host
app.listen(appEnv.port, appEnv.bind, function() {

  //print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
