import React from 'react'
import './CryptoPriceCard.css'

export default function CryptoPriceCard() {

    return(
        <div className="crypto__card-box">
            <a className="crypto__card-link" href="#">
                <div className="crypto__card">
                    <div className="crypto__card-left">
                        <div className="crypto__card-logo-box">
                            <img className="crypto__card-logo" src="https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg" />
                        </div>
                        <div className="crypto__card-price">
                            <h3 className="crypto__card-price-text">$21, 450</h3>
                            <p className="crypto__card-coin">Bitcoin . BTC</p>
                        </div>
                    </div>
                    <div className="crypto__card-right">
                        <svg className="crypto__card-change-svg" width="14" height="8" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.0696 9C15.1421 9 15.2073 8.94999 15.2362 8.87056C15.2651 8.79133 15.2471 8.70367 15.1964 8.64523L7.74981 0.062561C7.71356 0.0207884 7.66643 0 7.62304 0C7.57965 0 7.52894 0.0207879 7.49627 0.062561L0.0536291 8.64071C0.00292103 8.69503 -0.0151129 8.78682 0.0138126 8.87036C0.042739 8.94959 0.10791 8.99979 0.180394 8.99979L15.0696 9Z" fill="#3FA34D"/>
                        </svg>
                        <p className="crypto__card-change">1.43</p>
                    </div>
                </div>
            </a>
        </div>
    )

}