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
    const baseUrl = 'https://newsapi.org/v2/everything?q=crypto&from=2022-07-06&sortBy=popularity&apiKey='
    const newsApiKey = process.env.REACT_APP_NEWS_API_KEY


    axios.get(`${baseUrl}${newsApiKey}`).then((response) => {
        res.json(response.data)
      }).catch(error => {
        console.log(error)
      })
})


app.listen(8000, () => console.log(`Server is running on port ${PORT}`))

