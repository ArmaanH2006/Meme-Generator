import React, { useState, useEffect } from "react";
import TrollPhonk from "./TrollPhonk.jpg";
import Header from "./Header";


export default function Meme() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });

    const [allMemes, setAllMemes] = useState([]);

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes));
    }, []);

    console.log(allMemes);



    function getMemeImage() {
        const memsArray = allMemes;
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const url = memsArray[randomNumber].url;

        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }));

    }

    function handleChange(event) {
        const {name, value} = event.target;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }


    async function downloadImage(url, filename = 'meme.jpg') {
        try {
            const res = await fetch(url);
            const blob = await res.blob();
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(a.href);
        } catch (e) {
            // fallback if CORS or fetch fails
            window.open(url, '_blank');
        }
    }


    function uploadImage() {
        // Functionality to upload image will be implemented here
    }







    return(
        <main>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className = "meme-form">
                    <input
                        type="text"
                        placeholder="Top text"
                        className="form--input"
                        name="topText"
                        value={meme.topText}
                        onChange={handleChange}
                    />


                    <input
                        type="text"
                        placeholder="Top text"
                        className="form--input"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}
                    />
                </div>

                <button className = "meme-button" onClick={getMemeImage}>Generate a New Meme Image!</button>

                <div className="meme">
                    <img className="meme-image" src={meme.randomImage} alt="Meme" />
                    <h2 className="meme--text top">{meme.topText}</h2>
                    <h2 className="meme--text bottom">{meme.bottomText}</h2>
                </div>

                <button type="button" className="download-button" onClick={() => downloadImage(meme.randomImage)}>Download Meme</button>
                <button type="button" className="upload-button" onClick={() => uploadImage()}>Upload Meme</button>

            </div>
        </main>
    )

}   