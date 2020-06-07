const Twit = require('twit');

// twitterCredentials.js should export an object with this fields
// {
//     consumer_key: 'xx',
//     consumer_secret: 'xx',
//     access_token: 'xx',
//     access_token_secret: 'xx',
//     timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
//     strictSSL: true,     // optional - requires SSL certificates to be valid.
// }
const twitterCredentials = require('./twitterCredentials');

const T = new Twit(twitterCredentials)

const getKeywordTweets = (cbFn) => {
T.get('search/tweets',{q:'Bruxelles',count:5},(err,data,res)=>{
    if (err) {
        console.error('trends/place.err', err);
        cbFn(err, null);
    }

    console.log('data', data);
    console.log('res', res);
    const tweets = data;
    cbFn(null, tweets);

})
}

//23424757 Belgium
//23424900 MEXICO
//753692 BCN
const getCityTrends = (cbFn) => {
    T.get('trends/place', { id: '23424757', exclude: 'hashtags' }, function (err, response) {
        if (err) {
            console.error('trends/place.err', err);
            cbFn(err, null);
        }

        //console.log(response);
        //var tweets = reply;
        cbFn(null, response);
        console.log("TRENDS", response);        
    })
}

module.exports = {
    getKeywordTweets,
    getCityTrends,
};

