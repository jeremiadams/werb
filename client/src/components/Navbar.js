import React from 'react'
import {Link} from 'react-router-dom'
import Logo from '../images/web3-logo-light.png'
import './Navbar.css'

export default function Navbar(props) {

    return (
        <nav className="nav">
            <Link to="/"><img src={Logo} alt="web 3 logo" className="logo"/></Link>
            <div className="date__container">
                <h2 className="timeOfDay">{props.date.hours} : {props.date.minutes} {props.date.timeOfDay}</h2>
                <p className="dayOfWeek">{props.date.month} {props.date.day}, {props.date.dayOfWeek}</p>
            </div>
    
        </nav>
    )
}