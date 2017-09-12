const request = require('request');
const scr = require('./scrape');

const apiUrl = process.env.API_URL;

request(apiUrl,(error, response, html) => {
  if (!error && response.statusCode === 200) {
    console.log(scr.scrape(html));
  }
});