import React from 'react'
import './App.css';
import axios from 'axios'
import picData from './picData'

//Components
import Navbar from './Navbar'
import NewsCard from './NewsCard'
import PopularNews from './PopularNews'
import CryptoPriceCard from './CryptoPriceCard';

function App() {

  const [date, setDate] = React.useState({})
  const [news, setNews] = React.useState([])
  const [popularNews, setPopularNews] = React.useState([])
  const [coins, setCoins] = React.useState([])
  const [boxShadow, setBoxShadow] = React.useState(false)
  


  React.useEffect(() => {
    axios.get('/news').then((response) => {

      const shuffledArticles = response.data.articles.map(value => ({ value, sort: Math.random() }))
                                                     .sort((a, b) => a.sort - b.sort)
                                                     .map(({ value }) => value)
      setNews(shuffledArticles)
    }).catch(error => {
      console.log(error)
    })
  }, [])


  React.useEffect(() => {
    axios.get('/popular').then((response) => {
      setPopularNews(response.data.articles)
    }).catch(error => {
      console.log(error)
    })
  }, [])


  React.useEffect(() => {
      
          axios.get('/coins').then((response) => {
            setCoins(response.data.data.coins)
          }).catch(error => {
            console.log(error)
          })
      
    
  }, [])

  React.useEffect(() => {
      
    axios.get('https://cat-fact.herokuapp.com/facts').then((response) => console.log(response)).catch(error => {
      console.log(error)
    })


}, [])


  React.useEffect(function() {
    setInterval(() => {

      let myDate = new Date()

      const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      var hours = myDate.getHours()
      var minutes = myDate.getMinutes()
      var ampm = hours >= 12 ? 'am' : 'pm'
      hours = hours % 12
      hours = hours ? hours : 12
      minutes = minutes < 10 ? '0'+minutes : minutes


      setDate({
        year: myDate.getFullYear(),
        month: month[myDate.getMonth()],
        day: myDate.getDate(),
        dayOfWeek: dayOfWeek[myDate.getDay()],
        hours: hours,
        minutes: minutes,
        timeOfDay: ampm
      })
    }, 1000);
  }, []);
  

  React.useEffect(function() {
    const onScroll = () => {
      setBoxShadow(true)
    }
    window.addEventListener('scroll', onScroll)

    // return window.removeEventListener('scroll', onScroll)
  }, [])

  const navbarStyles = boxShadow ? {
    backgroundColor: '#13141c' ,
    boxShadow: '0 1px 50px 0 rgb(2 2 3 / 50%)',
    transition: 'boxShadow .4s'
  } : {}

  const icoStyles = boxShadow ? {
    opacity: '0',
    transition: 'opacity .4s',
    visibility: 'hidden'
  } : {}



  const newsCardElements = news.map(news => 
      {
  
        for (let i = 0; i < picData.length; i++) {
          if (news.source.name === picData[i].name)
              return (<NewsCard 
                        id={news?.source.id}
                        key={news?.url}
                        name={news?.source.name}
                        title={news?.title}
                        url={news?.url}
                        img={news?.urlToImage}
                        logo={picData[i].logo}
                     />)
        } 
      
      }    
            
  )


  const cryptoCardElements = coins.map(coin =>

      <CryptoPriceCard 
        id={coin?.uuid}
        key={coin?.uuid}
        name={coin?.name}
        symbol={coin?.symbol}
        img={coin?.iconUrl}
        price={coin?.price}
        change={coin?.change}
        url={coin?.coinrankingUrl}
      />

  )

 

  return (
    <div className="app">
        <div className="navbar" style={navbarStyles}><Navbar date={date} /></div>




        <div className="scroll-btn" style={icoStyles}>
            <a className="scroll-link" href="#main__bottom">
              <div className="ico-container">
                <div className="chevron-container">
                  <div className="chevron"></div>
                  <div className="chevron"></div>
                  <div className="chevron"></div>
                </div>
              </div>
            </a>
        </div>
        
        <main className="main">

            <section className="main__top">

                <div className="main__top-left">

                    <PopularNews  
                      id={popularNews[4]?.source.id}
                      key={popularNews[4]?.url}
                      name={popularNews[4]?.source.name}
                      title={popularNews[4]?.title}
                      url={popularNews[4]?.url}
                      img={popularNews[4]?.urlToImage}
                    />

                </div>

                <div className="main__top-right">

                  <div className="main__top-right-crypto">
                    {cryptoCardElements}

                  </div>
                  
                  <div className="main__top-right-popular">
                      <PopularNews  
                        id={popularNews[8]?.source.id}
                        key={popularNews[8]?.url}
                        name={popularNews[8]?.source.name}
                        title={popularNews[8]?.title}
                        url={popularNews[8]?.url}
                        img={popularNews[8]?.urlToImage}
                      />

                      <PopularNews  
                        id={popularNews[6]?.source.id}
                        key={popularNews[6]?.url}
                        name={popularNews[6]?.source.name}
                        title={popularNews[6]?.title}
                        url={popularNews[6]?.url}
                        img={popularNews[6]?.urlToImage}
                      /> 
                    
                  </div>

                </div>

          </section>

          <section id="main__bottom" className="main__bottom">

              <h2 className="main__bottom-heading">Latest News</h2>

              {newsCardElements}

              

          </section>

        </main>
        
    </div>
  )
}

export default App;
