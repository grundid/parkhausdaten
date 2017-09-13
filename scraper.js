const request = require('request');
const scr = require('./scrape');

const inputUrl = process.env.MORPH_INPUT_URL;
const outputUrl = process.env.MORPH_OUTPUT_URL;

function scrapeData() {
    console.log("Running update");
    request(inputUrl, (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const result = scr.scrape(html);
            let opts = {
                url: outputUrl,
                method: 'POST',
                json: result
            };
            console.log("Data to send: ", result);
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
    setInterval(scrapeData, 6 * 60 * 1000);
} else {
    console.log("Config missing: ", inputUrl, " out: ", outputUrl);
}



