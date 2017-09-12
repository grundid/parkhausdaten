const cheerio = require('cheerio');
const moment = require('moment');

function scrape(html) {
    let result = {carparks: {}};
    let $ = cheerio.load(html);
    let updateTime = $('div.carparkHead > div').text();                     //extract update time
    updateTime = updateTime
        .replace("Datum: ", "")
        .replace(" - Uhrzeit: ", " ");                                      //quite dirty method, but should work
    let t = moment(updateTime, 'DD.MM.YYYY HH:mm');                         //parse update time
    result.time = t.unix();

    $('div.carparkContent').each(function (i, element) {                      //loop thorugh all carpark elements
        let location = $(this).find('.carparkLocation > a').text();           //extract carpark name
        if (location) {
            let freeString = $(this).children('.col-xs-5').text();                //extract carpark free places
            let free = freeString.replace("Freie Parkplätze: ", "") || -1;        //remove unnecessary string, write undefined instead of empty string
            if (free > 0) {
                result.carparks[location] = {free: +free};                            //add carpark to results
            }
        }
    });
    return result;
}

module.exports = {
    scrape
};