const showTweetsResults = (trends, location) => {

    options.title.text = `Trends in ${location.name}`;
    options.series[0].data = trends.map(t => t.tweet_volume);
    options.xaxis.categories = trends.map(t => t.name);
    chart = new ApexCharts(document.querySelector('#chart'), options);
    chart.render();
  
    const output = document.querySelector('#output')
  
    
    let html = `
    <div class="w3-container w3-padding">
      <h2>Trends in ${location.name}</h2>
      <div class="w3-container w3-padding">
      <table class="table table-bordered table-sm table-hover table-striped table-light">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Number of Tweets</th>
            <th scope="col">Trend</th>
          </tr>
        </thead>
        <tbody>
    </div>     
    `
    trends.forEach(function (trend, i) {
      html += `
                <tr>
                  <td>${trend.tweet_volume}</td>
                  <td><a href="${trend.url}" target="_blank">${trend.name}</a></td>
                </tr>
                         
        `
    })
    output.innerHTML = html;
  };
  
  
  const showKeywordTweets = (queryTweets) => {
  
    const outputQueryResults = document.querySelector('#outputQueryResults')
    let html =  `<h2> Tweets about ${queryTweets.search_metadata.query}</h2>`
    queryTweets.statuses.forEach(function (x, i) {
  
        let username= x.user.screen_name;
        let name = x.user.name
        //let followers= x.user.followers_count;
        let tweetPostedDate = x.created_at;
        tweetPostedDate= tweetPostedDate.substring(4, 10);
        let profileLang = x.lang;
        profileLangUpper = profileLang.toUpperCase();
        let tweet = x.text;
        let url =x.user.url;
        let profile_image = x.user.profile_image_url;
        //let profile_image = "https://pbs.twimg.com/profile_images/688585357722398724/CIG00Dvy_normal.jpg";
        
        let description = x.user.description;
  
      html += `       
  
          
            <div class="w3-card w3-margin">
              <div class="card-header">              
                <img src=${profile_image} class="rounded-circle" alt=${profileLang}>
                  <a href="https://twitter.com/${username}" target="_blank">${username}</a>     ${tweetPostedDate}
                <div class="pull-right">   
                </div>
              </div>
              <div class="card-block">
                <table class="table  table-bordered table-hover table-sm  w3-hoverable w3-white f32">
                  <thead>
                    <tr>
                      <td>${name}: <br>${description}</td>
                      <td>Tweet: "${tweet} <a href="${url}" target="_blank">"</a></td>
                      
                      <td><i class="flag ${profileLang}"></i><br> ${profileLangUpper}</td>
                    </tr>
                  </thead>
                  
                </table>
              </div>
            </div>      
  
        `
    })
    outputQueryResults.innerHTML = html;
  };
  
  
  
  
  function getTrends() {
    fetch('api/cityTweets')
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        console.log(response);
        showTweetsResults(response.trends, response.location)
      });
  }
  
  function getKeywordTweetsClient() {
    fetch('api/keywordTweets')
      .then(function (response) {
        return response.json();
      })
      .then(function (queryTweets) {
        console.log(queryTweets);
        showKeywordTweets(queryTweets)
      });
  }
  
  
  
  console.log('getTrends...');
  getTrends();
  
  console.log('getKeywordTweets...');
  getKeywordTweetsClient();
  