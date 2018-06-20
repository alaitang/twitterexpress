var express = require('express');
var router = express.Router();
router.get('/tweetpost',function(req,res,next){

  var url = require('url');
var url_parts = url.parse(req.url, true);
var query = url_parts.query;
console.log();
  var client = getClient();

  client.post('statuses/update', {status:query.content},((error, data, response)=> {
    
  res.redirect('/');
  }) );
});
/* GET home page. */
router.get('/', function(req, res, next) {

  var url = require('url');
var url_parts = url.parse(req.url, true);
var query = url_parts.query;
//console.log(query);
    var client = getClient();
    var searchName = 'tang_alai';
    if(query.searchText != undefined)
      searchName = query.searchText;
    client.get('statuses/user_timeline', {screen_name: searchName,exclude_replies:false}, 
    function(error, tweets, response) {
      
      
      if (!error) {
        //console.log(tweets);
        //console.log('a');

        client.get('users/show', {screen_name: searchName,exclude_replies:false}, 
          function(err, userdata, resp) {
            if (!error) {
              //console.log(data);
              
            }

    
var responseObj = { title: 'Twitter Example',user:{
  id:userdata.id,
  name:userdata.name,
  imageUrl:userdata.profile_image_url
},
tweets:tweets};

            res.render('index',responseObj );
          });
      }
    });


});

function getClient(){
  var Twitter = require('twitter');
  var client = new Twitter({
    consumer_key: 'WsM6Hw9RjAkOgNq9XeHR7D7AB',
    consumer_secret: 'nQJ7tX7wZSHq9AcQXL6wfXnIzpq7PR0vliS3HjSjizkvo1rbJh',
    access_token_key: '120942356-Ti37QfqpoTaZILhRcBgnBNzxpIN3DqiN0xgYydmB',
    access_token_secret: 'A589dOT1tHy6U6DMRX2XROXhQTp3e8D5rGh5ypv97hKld',
    request_options: {
      headers: {
        'Access-Control-Allow-Origin':'http://localhost:3000/',
        "Access-Control-Allow-Credentials": false
      },request_options: {
        proxy: 'http://localhost:3000'
      }
    }
  });
  return client;
}




module.exports = router;
