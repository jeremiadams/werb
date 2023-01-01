const express = require("express");
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()


const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors())

app.get('/', (req,res) => {
    res.json('hi')
})


app.get('/news', (req,res) => {
    let myDate = new Date()
    const year = myDate.getFullYear()
    const month = myDate.getMonth() + 1
    const day = myDate.getDate() - 3       
    // ${year}-${month}-${day}

    const options = {
        method: 'GET',
        url: `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=cryptocurrency&from=${year}-${month}-${day}&sortBy=popularity&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`,
        headers: {
          origin: 'newsapi.org',
          'x-requested-with': 'newsapi.org',
        }
      };
      
    axios.request(options).then(function (response) {
        res.json(response.data)
    }).catch(function (error) {
        console.error(error);
    });

})


app.get('/popular', (req,res) => {
    const options = {
        method: 'GET',
        url: `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`,
        headers: {
          origin: 'newsapi.org',
          'x-requested-with': 'newsapi.org',
        }
      };
      
    axios.request(options).then(function (response) {
        res.json(response.data)
    }).catch(function (error) {
        console.error(error);
    });

})




app.get('/coins', (req,res) => {

    const options = {
        method: 'GET',
        url: 'https://coinranking1.p.rapidapi.com/coins',
        params: {
            referenceCurrencyUuid: 'yhjMzLPhuIDl',
            timePeriod: '24h',
            'tiers[0]': '1',
            orderBy: 'marketCap',
            orderDirection: 'desc',
            limit: '50',
            offset: '0'
        },
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    };
    
    axios.request(options).then((response) => {
        res.json(response.data)
    }).catch((error) => {
        console.error(error)
    });
    
})


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))


// const express = require("express");

// const PORT = process.env.PORT || 3001;

// const app = express();

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });
