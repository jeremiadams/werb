import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Logo from '../images/web3-logo-light.png'
import './Navbar.css'
import { format } from 'date-fns'

export default function Navbar() {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000)

        return () => clearInterval(timer);
    })

    return (
        <nav className="nav">
            <Link to="/"><img src={Logo} alt="web 3 logo" className="logo"/></Link>
            <div className="date__container">
                <h2 className="timeOfDay">{format(date, 'hh : mm aaa')}</h2>
                <p className="dayOfWeek">{format(date, 'MMMM d, EEEE')}</p>
            </div>
    
        </nav>
    )
}