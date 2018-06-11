var request   = require('request');
const fs      = require('fs');
const secrets = require('./secrets.js')


console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'GITHUB_TOKEN'
    }
  };
  request(options, function(err, res, body) {
    let parseResult = JSON.parse(body);
    cb(err, parseResult)
  });
}


function downloadImageByURL(url, filePath) {
  request.get(url)
         .on('error', function (err) {
            throw err;
          })
         .on('response', function (response) {
           console.log('Response Status Code: ', response.statusCode);
         })
         .pipe(fs.createWriteStream('./downloaded.jpg'));
}


getRepoContributors("jquery", "jquery", function(err, result) {
  result.forEach(function (element) {
    console.log(element.avatar_url)
  })
});



downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")