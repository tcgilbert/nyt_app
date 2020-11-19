require('dotenv').config();
const express = require('express');
const axios = require('axios');
const esjLayouts = require('express-ejs-layouts')

//App
const app = express();
const PORT = process.env.PORT || 3000;
const NYT_API_KEY = process.env.NYT_API_KEY;

//setup EJS
app.set('view engine', 'ejs');
app.use(esjLayouts);
console.log(NYT_API_KEY);

app.get('/', (req, res) => {
    const query = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=godfather&api-key=${NYT_API_KEY}`;
    axios.get(query).then((response => {
        
        if (response.status === 200) {
            console.log(response.data.results);
            let len = response.data.results.length;
            for (let i = 0; i < len; i++) {
                let resultsObject = response.data.results[i];
                const movieReviewObj = {
                    title: resultsObject.display_title,
                    author: resultsObject.byline,
                    date: resultsObject.publication_date,
                    url: resultsObject.link.url,
                    headline: resultsObject.headline,
                }
                console.log(movieReviewObj);
            }
        }
    })).then(
        res.send('yooo')
    )
});

app.listen(PORT, () => {
    console.log('server live');
})