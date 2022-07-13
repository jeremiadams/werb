import React from 'react'
import './App.css';
import axios from 'axios'

//Components
import Navbar from './Navbar'

function App() {

  // const [newsData, setNewsData] = React.useState([])
  const [date, setDate] = React.useState({})


  React.useEffect(() => {
    axios.get('http://localhost:8000/news').then((response) => {
      console.log(response.data)
    }).catch(error => {
      console.log(error)
    })
  }, [])


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

  return (
    <div>
        <Navbar date={date} />
    </div>
  );
}

export default App;
