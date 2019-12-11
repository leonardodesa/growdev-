import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { userInfo } from 'os';

export default function Mural() {
    const [cards, setCards] = useState([]); 

    useEffect( () => {
        async function loadCards() {
            const response = await api.get('/cards');
            console.log(response);
            setCards(response.data);
        }

        loadCards();
    },  []);

    return (
        <div className="main-container">
            {cards.map(card => (
                <h1 key={card._id}>{card.titulo}</h1>
            ))}
        </div>
    )
}