import React from "react";
import TrollPhonk from "./TrollPhonk.jpg";

function Header(){
    return(
        <header className="App-header">
            <img 
                src={TrollPhonk}
                alt="Troll Phonk"
                className="Header--image"
            />
            <div className="Header--text">
                <h1 className="header--title">Meme Generator</h1>
                <p className="header--subtitle">Create hilarious memes in seconds</p>
                <p style={{marginTop: '8px', fontSize: '0.95rem', opacity: 0.9}}>
                    Built by Armaan Hossain
                </p>
            </div>
        </header>
    )
}

export default Header;




