import React from 'react'
import './CryptoPriceCard.css'

export default function CryptoPriceCard(props) {

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const isNegative = (num) => {
       return Math.sign(num) === -1 ? true : false
    }

    const styles = {
        color: isNegative(props.change) ? '#FF3C38' : '#3FA34D'
    }

    return(
        <div className="crypto__card-box">
            <a className="crypto__card-link" href={props.url}>
                <div className="crypto__card">
                    <div className="crypto__card-left">
                        <div className="crypto__card-logo-box">
                            <img className="crypto__card-logo" alt="Crypto Logo" src={props.img} />
                        </div>
                        <div className="crypto__card-price">
                            <h3 className="crypto__card-price-text">${numberWithCommas(Number(props.price).toFixed(2))}</h3>
                            <p className="crypto__card-coin">{props.name} . {props.symbol}</p>
                        </div>
                    </div>
                    <div className="crypto__card-right">
                        {   isNegative(props.change) ?  <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0.180395 0C0.107907 0 0.042737 0.0500107 0.013813 0.129436C-0.0151129 0.208666 0.00292301 0.296329 0.0536299 0.354774L7.50019 8.93744C7.53644 8.97921 7.58357 9 7.62696 9C7.67035 9 7.72106 8.97921 7.75373 8.93744L15.1964 0.359292C15.2471 0.30497 15.2651 0.213184 15.2362 0.129642C15.2073 0.0504122 15.1421 0.000206947 15.0696 0.000206947L0.180395 0Z" fill="#FF3C38"/>
                                                        </svg> :    
                                                        <svg className="crypto__card-change-svg" width="14" height="8" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M15.0696 9C15.1421 9 15.2073 8.94999 15.2362 8.87056C15.2651 8.79133 15.2471 8.70367 15.1964 8.64523L7.74981 0.062561C7.71356 0.0207884 7.66643 0 7.62304 0C7.57965 0 7.52894 0.0207879 7.49627 0.062561L0.0536291 8.64071C0.00292103 8.69503 -0.0151129 8.78682 0.0138126 8.87036C0.042739 8.94959 0.10791 8.99979 0.180394 8.99979L15.0696 9Z" fill="#3FA34D"/>
                                                        </svg>
                        }
                        
                        <p className="crypto__card-change" style={styles}>{props.change}</p>
                    </div>
                </div>
            </a>
        </div>
    )

}