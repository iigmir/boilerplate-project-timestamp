// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function(req, res) {
    function get_date(input = undefined) {
        if(input) {
            const date_str = /^\d{13}$/g.test(input) ?
                // An unix timestamp string
                Number(input) :
                // A typical date string
                String(input)
            ;
            return new Date( date_str );
        }
        return new Date();
    }
    const date = get_date(req.params.date);
    const utc = date.toString();
    if( utc === "Invalid Date" ) {
        return { error: utc };
    }
    res.json({
        unix: date.getTime(),
        utc: utc,
    });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});
