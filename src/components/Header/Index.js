import React from "react";
import './style.css';

export default ({ blackHeader }) =>{
    return (
        <header className={ blackHeader ? 'black' : ''}>
            <div className="header--logo">
                <a href="/" > 
                    <img alt="logo" src="https://logodownload.org/wp-content/uploads/2014/10/netflix-logo-5.png"/>
                </a>
            </div>
            <div className="header--uswer">
                <a href="/">
                    <img alt="perfil" src="https://lh3.googleusercontent.com/a/AEdFTp5BiXJ2oUKy8b3_XRFtgyrrt_8jr8rtA1YWtzhQRjw=s360-p-rw-no" />
                </a>
            </div>
        </header>
    )
}