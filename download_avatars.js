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
    cb(err, body)

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
  .pipe(fs.createWriteStream(filePath));
}


getRepoContributors("jquery", "jquery", function(err, result) {
  let parsedResult = JSON.parse(result);

  for (let i = 0; i < parsedResult.length; i++) {
    downloadImageByURL(parsedResult[i].avatar_url, './downloadedImg/' + parsedResult[i].login + '.png')
  };
})



