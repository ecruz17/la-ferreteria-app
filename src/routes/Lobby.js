import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import "../App.css";

function Lobby() {

    const [meme, setMeme] = useState('');

    const fetchData = async () => {
        try {
            const memeResponse = await axios.get(`https://meme-api.com/gimme`);
            if (!memeResponse.data.preview[3]) {

                fetchData();
            } else {
                setMeme(memeResponse.data.preview[3]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <h1>¡Gracias!</h1>
            <h3>Un administrador te notificará cuando se active tu cuenta.</h3>
            <h5>Por lo pronto aprecia unos buenos memes:</h5>
            <div className='meme-holder'>
                <img src={meme} alt="meme_img" className='meme-container' />
            </div>
            <br />
            <div className='btns-holder'>
                <button onClick={() => fetchData()}>Otro meme</button>
                <br />
                <Link to={"/"}>Iniciar sesión</Link>
            </div>
        </div>
    )
}

export default Lobby;