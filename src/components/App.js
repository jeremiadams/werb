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

  // const [newsData, setNewsData] = React.useState([])
  const [date, setDate] = React.useState({})
  const [news, setNews] = React.useState([])
  const [popularNews, setPopularNews] = React.useState([])
  const [coins, setCoins] = React.useState([])
  // const [topPopularNews, setTopPopularNews] = React.useState({})
  // const [otherPopularNews, setOtherPopularNews] = React.useState([])


  React.useEffect(() => {
    axios.get('http://localhost:8000/news').then((response) => {
      setNews(response.data.articles)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  React.useEffect(() => {
    axios.get('http://localhost:8000/breaking-news').then((response) => {
      setPopularNews(response.data.articles)
    }).catch(error => {
      console.log(error)
    })
  }, [])


  React.useEffect(() => {
    axios.get('http://localhost:8000/coins').then((response) => {
      setCoins(response.data.data.coins)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  //  console.log(news)


  React.useEffect(function() {
    const interval = setInterval(() => {

      let myDate = new Date();

      const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      var hours = myDate.getHours();
      var minutes = myDate.getMinutes();
      var ampm = hours >= 12 ? 'am' : 'pm';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0'+minutes : minutes;


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


  const newsCardElements = news.map(news => 
      {
        
        for (let i = 0; i < picData.length; i++) {
          if (news.source.name === picData[i].name)
              return <NewsCard 
                        id={news.source.id}
                        key={news.url}
                        name={news.source.name}
                        title={news.title}
                        url={news.url}
                        img={news.urlToImage}
                        logo={picData[i].logo}
                     />
        } 
      
      }    
            
  )

  // const cryptoCardElements = coins.map(coin => 
  //       <CryptoPriceCard 
  //         id
  //       />


  // )

  return (
    <div className="app">
        <div className="navbar"><Navbar date={date} /></div>
        {/* <NewsCard newsCard={news[0]} />
        <PopularNews />
        <CryptoPriceCard /> */}
        <main className="main">

            <section className="main__top">

                <div className="main__top-left">

                    {/* <PopularNews  
                      id={popularNews[5].source.id}
                      key={popularNews[5].url}
                      name={popularNews[5].source.name}
                      title={popularNews[5].title}
                      url={popularNews[5].url}
                      img={popularNews[5].urlToImage}
                    /> */}

                </div>

                <div className="main__top-right">

                  <div className="main__top-right-crypto">
                    <CryptoPriceCard />
                    <CryptoPriceCard />
                    <CryptoPriceCard />
                    <CryptoPriceCard />
                    
                  </div>
                  
                  <div className="main__top-right-popular">
                      {/* <PopularNews  
                        id={popularNews[6].source.id}
                        key={popularNews[6].url}
                        name={popularNews[6].source.name}
                        title={popularNews[6].title}
                        url={popularNews[6].url}
                        img={popularNews[6].urlToImage}
                      />

                      <PopularNews  
                        id={popularNews[10].source.id}
                        key={popularNews[10].url}
                        name={popularNews[10].source.name}
                        title={popularNews[10].title}
                        url={popularNews[10].url}
                        img={popularNews[10].urlToImage}
                      /> 
                     */}
                  </div>

                </div>

          </section>

          <section className="main__bottom">

              {newsCardElements}

              

          </section>

        </main>

        

    </div>
  );
}

export default App;
