import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import "../App.css";

function Oops() {

    const [meme, setMeme] = useState('');
    const [hasMeme, setHasMeme] = useState(false);

    const fetchData = async () => {
        try {
            const memeResponse = await axios.get(`https://meme-api.com/gimme`);
            if (!memeResponse.data.preview[3]) {
                fetchData();
                setHasMeme(false)
            } else {
                setMeme(memeResponse.data.preview[3]);
                setHasMeme(true)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h1>¡Ni modo!</h1>
            {
                hasMeme ?
                    <img src={meme} alt="meme" className='meme-container' /> :
                    <img src="https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80" alt="nimodo" className='meme-container' />
            }
            <br />
            <br />
            <h3>Crea otra cuenta o notifícaselo a un administrador...</h3>
            <h5>o mira unos buenos memes de mientras:</h5>
            <button onClick={() => fetchData()}>Otro meme</button>
            <br />
            <Link to={"/"}>Iniciar sesión</Link>
        </div>
    )
}

export default Oops;