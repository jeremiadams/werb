import React, {useState, useEffect} from 'react'
import {Link, Routes, Route} from 'react-router-dom'
import './App.css';
import axios from 'axios'
import picData from './picData'

//Components
import Navbar from './Navbar'
import NewsCard from './NewsCard'
import PopularNews from './PopularNews'
import CryptoPriceCard from './CryptoPriceCard';

function App() {

  const [date, setDate] = useState({})
  const [news, setNews] = useState([])
  const [popularNews, setPopularNews] = useState([])
  const [coins, setCoins] = useState([])
  const [boxShadow, setBoxShadow] = useState(false)

  const [bookmarkedNews, setBookmarkedNews] = useState(
    JSON.parse(localStorage.getItem('bookmarkedNews')) || []
  )

  useEffect(() => {
    const options = {
      methos: 'GET',
      url: '/.netlify/functions/getNewsData'
    }

    axios.request(options).then((response) => {
      const updatedArticles = response.data.articles.map(article => ({...article, isFavorite: false}))

      const shuffledArticles = updatedArticles.map(value => ({ value, sort: Math.random() }))
                                                     .sort((a, b) => a.sort - b.sort)
                                                     .map(({ value }) => value)
      setNews(shuffledArticles)
    })

  }, [])



  useEffect(() => {
    const options = {
      methos: 'GET',
      url: '/.netlify/functions/getPopularNewsData'
    }

    axios.request(options).then((response) => {
      setPopularNews(response.data.articles)
    })
  }, [])


  useEffect(() => {
    const options = {
      methos: 'GET',
      url: '/.netlify/functions/getCoinsData'
    }

    axios.request(options).then((response) => {
      setCoins(response.data.data.coins)
    })
      
  }, [])




  useEffect(function() {
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
  

  useEffect(function() {
    const onScroll = () => {
      setBoxShadow(true)
    }
    window.addEventListener('scroll', onScroll)

    // return window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    localStorage.setItem('bookmarkedNews', JSON.stringify(bookmarkedNews))
  }, [bookmarkedNews])


  function toggleBookmark(id) {
   const updatedNewsArr = news.map(news => {
     //loop over news array and change the item with incoming id's isfav property to the opposite
     //loop over bookmarks and get the index of the id.
     //if that item is in the bookmark remove it else place it

      if (news._id === id) {
          const ind = bookmarkedNews.findIndex(item => item._id === id)
          const updatedArr = [...bookmarkedNews]
          if (ind === -1) {
              updatedArr.push({
                  ...news,
                  isFavorite: true
              })
              setBookmarkedNews(updatedArr)
          } else if (ind >= 0) {
              updatedArr.splice(ind, 1)
              setBookmarkedNews(updatedArr)
          }

          return {
            ...news,
            isFavorite: !news.isFavorite
          }
      } else return news
    })

    setNews(updatedNewsArr)
  }




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
          if (news.clean_url === picData[i].name)
              return <NewsCard 
                        id={news?._id}
                        key={news?._id}
                        name={news?.clean_url}
                        title={news?.title}
                        url={news?.link}
                        img={news?.media}
                        logo={picData[i].logo}
                        isBookmarked={news?.isFavorite}
                        bookmark={toggleBookmark}
                     />
        } 
        return null
      
      }    
            
  )


  const bookmarkedElems = bookmarkedNews.map(news => 
    {

      for (let i = 0; i < picData.length; i++) {
        if (news.clean_url === picData[i].name)
            return <NewsCard 
                      id={news?._id}
                      key={news?._id}
                      name={news?.clean_url}
                      title={news?.title}
                      url={news?.link}
                      img={news?.media}
                      logo={picData[i].logo}
                      isBookmarked={news?.isFavorite}
                      bookmark={toggleBookmark}
                   />
      } 
      return null
    
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

        <Link to="/bookmarks">
          <div className="bookmark">
              {bookmarkedNews.length > 0 ? 
              <svg id="bookmark-svg" className="newscard__bottom-bookmark" width="23" height="33" viewBox="0 0 23 33" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.972664 0H21.4012C21.9377 0 22.3741 0.53545 22.3741 1.19389L22.3739 32.9999L12.7514 23.8721C11.8741 23.0396 10.4836 23.055 9.58591 23.9066L0 33V1.19396C0 0.535528 0.4363 -0.000299126 0.972664 0Z" fill="#ffc300" />
              </svg> :
              <svg id="bookmark-svg" className="newscard__bottom-bookmark" width="23" height="33" viewBox="0 0 23 33" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.972664 0H21.4012C21.9377 0 22.3741 0.53545 22.3741 1.19389L22.3739 32.9999L12.7514 23.8721C11.8741 23.0396 10.4836 23.055 9.58591 23.9066L0 33V1.19396C0 0.535528 0.4363 -0.000299126 0.972664 0Z" fill="#908F94" />
              </svg>}
          </div>
        </Link>

        <Routes>
            <Route  
                path="/" 
                element={
                    <>
                       
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
                                      id={popularNews[3]?._id}
                                      key={popularNews[3]?._id}
                                      name={popularNews[3]?.clean_url}
                                      title={popularNews[3]?.title}
                                      url={popularNews[3]?.link}
                                      img={popularNews[3]?.media}
                                    />

                                </div>

                                <div className="main__top-right">

                                  <div className="main__top-right-crypto">
                                    {cryptoCardElements}

                                  </div>
                                  
                                  <div className="main__top-right-popular">
                                      <PopularNews  
                                        id={popularNews[8]?._id}
                                        key={popularNews[8]?._id}
                                        name={popularNews[8]?.clean_url}
                                        title={popularNews[8]?.title}
                                        url={popularNews[8]?.link}
                                        img={popularNews[8]?.media}
                                      />

                                      <PopularNews  
                                        id={popularNews[6]?._id}
                                        key={popularNews[6]?._id}
                                        name={popularNews[6]?.clean_url}
                                        title={popularNews[6]?.title}
                                        url={popularNews[6]?.link}
                                        img={popularNews[6]?.media}
                                      /> 
                                    
                                  </div>

                                </div>

                          </section>

                          <section id="main__bottom" className="main__bottom">

                              <h2 className="main__bottom-heading">Latest News</h2>

                              {newsCardElements}
                              

                          </section>

                        </main>

                    </>
                }
              />

              <Route  
                    path="/bookmarks" 
                    element={
                        <>
                            <main className="main">
                              <section id="main__bottom" className="main__bottom main__bookmarks">

                              <h2 className="main__bottom-heading">Bookmarks</h2>

                              {bookmarkedNews.length > 0 ? bookmarkedElems : 
                                <p className="empty">You currently have no bookmarks!</p>
                              }


                              </section>
                            </main>
                        </>
                    }
              />
        </Routes>

        
        
    </div>
  )
}

export default App;
