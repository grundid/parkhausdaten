const request = require('request');
const scr = require('./scrape');

const inputUrl = process.env.MORPH_INPUT_URL;
const outputUrl = process.env.MORPH_OUTPUT_URL;

function scrapeData() {
    console.log("Running update ", new Date());
    request(inputUrl, (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const result = scr.scrape(html);
            let opts = {
                url: outputUrl,
                method: 'POST',
                json: result
            };
            request(opts, (err, res, body) => {
                if (err) {
                    console.log("Error: ", err);
                } else {
                    console.log("Done: ", res.statusCode);
                }
            })
        }
    });
}

if (inputUrl && outputUrl) {
    scrapeData();
} else {
    console.log("Config missing: ", inputUrl, " out: ", outputUrl);
}



