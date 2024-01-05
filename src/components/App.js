import React, {useState, useEffect} from 'react'
import {Link, Routes, Route} from 'react-router-dom'
import './App.css';
import axios from 'axios'

//Components
import Navbar from './Navbar'
import NewsCard from './NewsCard'
import PopularNews from './PopularNews'
import CryptoPriceCard from './CryptoPriceCard';
import Privacy from './Privacy'
import Loading from './Loading';

function App() {



  const [news, setNews] = useState([])
  const [popularNews, setPopularNews] = useState([])
  const [coins, setCoins] = useState([])
  const [boxShadow, setBoxShadow] = useState(false)
  const [loading, setLoading] = useState(false)

  const [bookmarkedNews, setBookmarkedNews] = useState(
    JSON.parse(localStorage.getItem('bookmarkedNews')) || []
  )


  async function getFavicon(domain) {
    const options = {
        method: 'GET',
        url: 'https://faviconfinder.p.rapidapi.com/faviconurl/',
        params: {
          url: `https://${domain}`
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_FAVICON_API_KEY,
          'X-RapidAPI-Host': 'faviconfinder.p.rapidapi.com'
        }
    }
      
    try {
      const response = await axios.request(options);
      return response?.data.favicon_url;
    } catch (error) {
      return null;
    }
  }



  useEffect(() => {
    const options = {
      methos: 'GET',
      url: '/.netlify/functions/getNewsData'
    }

    setLoading(true)

    axios.request(options).then((response) => {

      Promise.all(
        response.data.data.map(async (article) => {
          return {...article, isFavorite: false, logo: await getFavicon(article.source)}
        })
      ).then((values) => {

        const newArr = [...bookmarkedNews]
      
        for (let i = 0; i < values.length; i++) {
          let ind = newArr.findIndex(item => item.uuid === values[i]?.uuid)
          if (ind === -1) {
            newArr.push(values[i])
          } else {
            continue
          }

        }

        const shuffledArticles = newArr.map(value => ({ value, sort: Math.random() }))
                                                      .sort((a, b) => a.sort - b.sort)
                                                      .map(({ value }) => value)
        setNews(shuffledArticles)
        setLoading(false)
      })
    })
    .catch((err) => {
      console.log("ERROR: ====", err)
    })
          

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  useEffect(() => {
    const options = {
      methos: 'GET',
      url: '/.netlify/functions/getPopularNewsData'
    }

    axios.request(options).then((response) => {
      setPopularNews(response.data.data)
    })
    .catch((err) => {
      console.log("ERROR: ====", err)
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
    .catch((err) => {
      console.log("ERROR: ====", err)
    })
      
  }, [])

  

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

      if (news.uuid === id) {
          const ind = bookmarkedNews.findIndex(item => item.uuid === id)
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
     
          <NewsCard 
                id={news?.uuid}
                key={news?.uuid}
                name={news?.url}
                title={news?.title}
                url={news?.url}
                img={news?.image_url}
                logo={news?.logo}
                isBookmarked={news?.isFavorite}
                bookmark={toggleBookmark}
              />

      
     
            
  )


  const bookmarkedElems = bookmarkedNews.map(news => 
    {

      return <NewsCard 
                      id={news?.uuid}
                      key={news?.uuid}
                      name={news?.url}
                      title={news?.title}
                      url={news?.url}
                      img={news?.image_url}
                      logo={news?.logo}
                      isBookmarked={news?.isFavorite}
                      bookmark={toggleBookmark}
                   />
    
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
        <div className="navbar" style={navbarStyles}><Navbar /></div>

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
                                        id={popularNews[0]?.uuid}
                                        key={popularNews[0]?.uuid}
                                        source={popularNews[0]?.source}
                                        title={popularNews[0]?.title}
                                        url={popularNews[0]?.url}
                                        img={popularNews[0]?.image_url}
                                      />

                                </div>

                                <div className="main__top-right">

                                  <div className="main__top-right-crypto">
                                    {cryptoCardElements}

                                  </div>
                                  
                                  <div className="main__top-right-popular">
                                      
                                        <PopularNews  
                                          id={popularNews[1]?.uuid}
                                          key={popularNews[1]?.uuid}
                                          source={popularNews[1]?.source}
                                          title={popularNews[1]?.title}
                                          url={popularNews[1]?.url}
                                          img={popularNews[1]?.image_url}
                                        />
                                      

                                      
                                        <PopularNews  
                                          id={popularNews[2]?.uuid}
                                          key={popularNews[2]?.uuid}
                                          source={popularNews[2]?.source}
                                          title={popularNews[2]?.title}
                                          url={popularNews[2]?.url}
                                          img={popularNews[2]?.image_url}
                                        /> 
                                  </div>

                                </div>

                          </section>

                          <section id="main__bottom" className="main__bottom">

                              <h2 className="main__bottom-heading">Latest News</h2>

                              {loading && <Loading />}

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

              <Route  
                    path="/privacy" 
                    element={
                        <Privacy />
                    }
              />
        </Routes>

        
        
    </div>
  )
}

export default App;
