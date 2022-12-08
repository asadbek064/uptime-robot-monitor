require('dotenv').config();
const API_KEY = process.env.Read_Only_API_Key;
var request = require("request");

// check if key provided 
if (!API_KEY) {
    console.log('API_KEY not provided');
    process.exit(0);
}

const getAllMonitors = new Promise ((reslove, reject) => {
    var options = { method: 'POST',
        url: 'https://api.uptimerobot.com/v2/getMonitors',
        headers:
        { 'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded' },
        form: { api_key: API_KEY, format: 'json', logs: '1' } };
            
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
    
        reslove(body);
    });
});

module.exports = { getAllMonitors}