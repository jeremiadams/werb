import React from 'react'
import './NewsCard.css'

export default function NewsCard (props) {

    return (
        <div className="newscard__box">
            <a className="newscard__link" href={props.url} target="_blank" rel="noreferrer">
                <div className="newscard">
                    <img src={props.img} alt="News" className="newscard__image"/>
                </div>
                <div className="newscard__info">
                    <div className="newscard__logo-box"><img src={props.logo} alt="News Agency Logo" className="newscard__logo"/></div>
                    <h3 className="newscard__title">{props.title}</h3>
                </div>
            </a>
            <div className="newscard__share">
                        <a target="_blank" rel="noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=${props.url}`}>
                            <span id="newscard__share-btn" className="newscard__share-btn"> 
                                <svg id="share-svg" className="newscard__facebook-caption" width="26" height="46" viewBox="0 0 26 46"  xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 9H25C25.552 9 26 8.552 26 8V1.263C26 0.739 25.597 0.303 25.075 0.266C23.484 0.153 20.376 0 18.141 0C12 0 8 3.68 8 10.368V17H1C0.448 17 0 17.448 0 18V25C0 25.552 0.448 26 1 26H8V45C8 45.552 8.448 46 9 46H16C16.552 46 17 45.552 17 45V26H24.222C24.732 26 25.16 25.617 25.216 25.11L25.994 18.11C26.06 17.518 25.596 17 25 17H17V12C17 10.343 18.343 9 20 9Z" />
                                </svg>
                            </span>
                        </a>
                        <a target="_blank" rel="noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${props.url}`}>
                            <span id="newscard__share-btn" className="newscard__share-btn"> 
                                <svg id="share-svg"  className="newscard__linkedin-caption" width="46" height="44" viewBox="0 0 46 44"  xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 44H0V14H10V44ZM5.002 10C2.236 10 0 7.758 0 4.998C0 2.238 2.24 0 5.002 0C7.758 0 10 2.242 10 4.998C10 7.758 7.758 10 5.002 10ZM46 44H36.386V29.4C36.386 25.918 36.32 21.44 31.388 21.44C26.382 21.44 25.612 25.232 25.612 29.148V44H16V13.978H25.228V18.08H25.358C26.642 15.72 29.78 13.232 34.46 13.232C44.2 13.232 46 19.45 46 27.534C46 27.534 46 44 46 44Z" />
                                </svg>
                            </span>
                        </a>
                        <a target="_blank" rel="noreferrer" href={`http://twitter.com/share?text=Via Werb&url=${props.url}&hashtags=werbchromeextension,werb`}>
                            <span id="newscard__share-btn" className="newscard__share-btn"> 
                                <svg id="share-svg" className="twitter-caption" width="51" height="41" viewBox="0 0 51 41"  xmlns="http://www.w3.org/2000/svg">
                                    <path d="M50.1211 4.82031C48.2734 5.64062 46.293 6.19141 44.2109 6.44141C46.3359 5.16797 47.9688 3.15234 48.7344 0.753906C46.75 1.92969 44.543 2.78516 42.2031 3.24609C40.3281 1.24609 37.6562 0 34.6992 0C29.0195 0 24.4141 4.60156 24.4141 10.2812C24.4141 11.0859 24.5078 11.8711 24.6836 12.625C16.1367 12.1953 8.5625 8.10156 3.48828 1.87891C2.60156 3.40234 2.09766 5.16797 2.09766 7.05078C2.09766 10.6172 3.91016 13.7656 6.67187 15.6133C4.98437 15.5586 3.39844 15.0938 2.01172 14.3242C2.01172 14.3672 2.01172 14.4102 2.01172 14.4531C2.01172 19.4375 5.55859 23.5898 10.2578 24.5391C9.39844 24.7734 8.48828 24.8984 7.55078 24.8984C6.88672 24.8984 6.24219 24.8359 5.61328 24.7109C6.92578 28.793 10.7227 31.7734 15.2188 31.8555C11.7031 34.6133 7.26953 36.2539 2.44922 36.2539C1.61719 36.2539 0.800782 36.207 0 36.1094C4.54688 39.0312 9.95312 40.7305 15.7617 40.7305C34.6758 40.7305 45.0195 25.0625 45.0195 11.4766C45.0195 11.0313 45.0078 10.582 44.9922 10.1445C47 8.69531 48.7422 6.88281 50.1211 4.82031Z" />
                                </svg>
                            </span>
                        </a>
                    </div>
            <div className="newscard__bottom">
                <span onClick={() => props.bookmark(props.id)} id="newscard__share-btn" className="newscard__bookmark-btn">
                    {props.isBookmarked ? 
                    <svg id="bookmark-svg" className="newscard__bottom-bookmark" width="23" height="33" viewBox="0 0 23 33" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.972664 0H21.4012C21.9377 0 22.3741 0.53545 22.3741 1.19389L22.3739 32.9999L12.7514 23.8721C11.8741 23.0396 10.4836 23.055 9.58591 23.9066L0 33V1.19396C0 0.535528 0.4363 -0.000299126 0.972664 0Z" fill="#ffc300"/>
                    </svg> :
                    <svg id="bookmark-svg" className="newscard__bottom-bookmark" width="23" height="33" viewBox="0 0 23 33" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.972664 0H21.4012C21.9377 0 22.3741 0.53545 22.3741 1.19389L22.3739 32.9999L12.7514 23.8721C11.8741 23.0396 10.4836 23.055 9.58591 23.9066L0 33V1.19396C0 0.535528 0.4363 -0.000299126 0.972664 0Z" fill="#908F94"/>
                    </svg>}
                </span>
            </div>
        </div>
    )
}