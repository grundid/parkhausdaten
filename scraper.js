const request = require('request');
const scr = require('./scrape');

const inputUrl = process.env.INPUT_URL;
const outputUrl = process.env.OUTPUT_URL;

request(inputUrl, (error, response, html) => {
    if (!error && response.statusCode === 200) {
        const result = scr.scrape(html);
        let opts = {
            url: outputUrl,
            method: 'POST',
            json: result
        };
        request(opts, (err, res, body) => {
            console.log("Done");
        })
    }
});
