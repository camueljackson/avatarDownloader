var request = require('request');
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

getRepoContributors("jquery", "jquery", function(err, result) {
result.forEach(function (element) {
  console.log(element.avatar_url)
})
  // console.log("Errors:", err);
  // console.log("Result:", result);
});


