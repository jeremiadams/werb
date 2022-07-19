const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()

app.use(cors())

app.get('/', (req,res) => {
    res.json('hi')
})

app.get('/news', (req,res) => {
    const baseUrl = 'https://newsapi.org/v2/everything?q=ethereum&from=2022-07-15&sortBy=popularity&apiKey='
    const newsApiKey = process.env.REACT_APP_NEWS_API_KEY


    axios.get(`${baseUrl}${newsApiKey}`).then((response) => {
        res.json(response.data)
      }).catch(error => {
        console.log(error)
      })
})

app.get('/breaking-news', (req,res) => {
    const baseUrl = 'https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey='
    const newsApiKey = process.env.REACT_APP_NEWS_API_KEY


    axios.get(`${baseUrl}${newsApiKey}`).then((response) => {
        res.json(response.data)
      }).catch(error => {
        console.log(error)
      })
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
            'X-RapidAPI-Key': '338db9705emsh8cf45bc515014e9p1ceb71jsnfc5e4831b76d',
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    };

    axios.request(options).then((response) => {
        res.json(response.data)
    }).catch((error) => {
        console.error(error)
    });
})


app.listen(8000, () => console.log(`Server is running on port ${PORT}`))

