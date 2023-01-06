const express = require("express");
const path = require('path');
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()


const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors())
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/', (req,res) => {
    res.json('hi')
})


// app.get('/news', (req,res) => {
//     let myDate = new Date()
//     const year = myDate.getFullYear()
//     const month = myDate.getMonth() + 1
//     const day = myDate.getDate() - 3    

//     const options = {
//         method: 'GET',
//         url: `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=ukraine&from=${year}-${month}-${day}&sortBy=popularity&apiKey=1df8476950f8455cb29aee0821714f48`,
//         headers: {
//           origin: 'newsapi.org',
//           'x-requested-with': 'newsapi.org',
//         }
//       };
      
//     axios.request(options).then(function (response) {
//         res.json(response.data)
//     }).catch(function (error) {
//         console.error(error);
//     });

// })

app.get('/news', (req,res) => {

    let options = {
        method: 'GET',
        url: 'https://api.newscatcherapi.com/v2/search',
        params: {q: 'q=crypto', lang: 'en', sort_by: 'relevancy', page: '1'},
        headers: {
          'x-api-key': '4SxNp_InuXrQUvzU7TgMAhCdkMGuX7HpFiMOLbeAx_Q'
        }
    };
      
    axios.request(options).then(function (response) {
    res.json(response.data);
    }).catch(function (error) {
        console.error(error);
    });

})


// app.get('/test', (req,res) => {
//     const options = {
//         method: 'GET',
//         url: `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=1df8476950f8455cb29aee0821714f48`,
//         headers: {
//           origin: 'newsapi.org',
//           'x-requested-with': 'newsapi.org',
//         }
//       };
      
//     axios.request(options).then(function (response) {
//         res.json(response.data)
//     }).catch(function (error) {
//         console.error(error);
//     });

// })

app.get('/popular', (req,res) => {
    let options = {
        method: 'GET',
        url: 'https://api.newscatcherapi.com/v2/search',
        params: {q: 'blockchain', lang: 'en', topic: 'tech', sort_by: 'relevancy', page: '1'},
        headers: {
            'x-api-key': 'TNqA3n-oLm1zZBdNyUf3YkxwEchqXaB5y4ZjHvqFKOw'
        }
    };
        
    axios.request(options).then(function (response) {
    res.json(response.data);
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
            'X-RapidAPI-Key': '33a028b672msh4d6a5eff88ddf94p1d4673jsnadaf0163ecc6',
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    };
    
    axios.request(options).then((response) => {
        res.json(response.data)
    }).catch((error) => {
        console.error(error)
    });
    
})


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
  });


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))



