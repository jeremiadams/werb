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
    let myDate = new Date()
    const year = myDate.getFullYear()
    const month = myDate.getMonth() + 1
    const day = myDate.getDate() - 3       
    // ${year}-${month}-${day}

    const baseUrl = `https://newsapi.org/v2/everything?q=heatwave&from=${year}-${month}-${day}&sortBy=popularity&apiKey=`
    const newsApiKey = process.env.REACT_APP_NEWS_API_KEY


    axios.get(`${baseUrl}${newsApiKey}`).then((response) => {
        res.json(response.data)
      }).catch(error => {
        console.log(error)
      })
})

app.get('/popular', (req,res) => {
    const baseUrl = 'https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey='
    const newsApiKey = process.env.REACT_APP_NEWS_API_KEY


    axios.get(`${baseUrl}${newsApiKey}`).then((response) => {
        res.json(response.data)
      }).catch(error => {
        console.log(error)
      })
})


// app.get('/coins', (req,res) => {

//     const options = {
//         method: 'GET',
//         url: 'https://coinranking1.p.rapidapi.com/coins',
//         params: {
//             referenceCurrencyUuid: 'yhjMzLPhuIDl',
//             timePeriod: '24h',
//             'tiers[0]': '1',
//             orderBy: 'marketCap',
//             orderDirection: 'desc',
//             limit: '50',
//             offset: '0'
//         },
//         headers: {
//             'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
//             'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
//         }
//     };
    
//     axios.request(options).then((response) => {
//         res.json(response.data)
//     }).catch((error) => {
//         console.error(error)
//     });
    
// })


app.listen(8000, () => console.log(`Server is running on port ${PORT}`))

