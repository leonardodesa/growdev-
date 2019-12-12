import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../assets/bootstrap/css/bootstrap.min.css';

export default function Mural() {
    const [cards, setCards] = useState([]); 

    useEffect( () => {
        async function loadCards() {
            const response = await api.get('/cards');
            setCards(response.data);
        }

        loadCards();
    },  []);

    async function deleteCard(e) {
        console.log(e.target);
    }

    return (
        <main role="main">
            <section className="jumbotron">
                
                <div className="container d-flex justify-content-center flex-md-column align-items-center">

                    <div className="jumbotron-heading">
                        <h2>Deixe um recado abaixo:</h2>
                    </div>

                    <form className="col-md-4 p-2">
                        <div className="form-group">
                            <p className="lead">Digite um título:</p>
                            <input type="text" className="form-control" id="titulo" placeholder="Digite o título..."></input>
                        </div>
                        <div className="form-group">
                            <p className="lead">Digite uma descrição:</p>
                            <input type="text" className="form-control" id="descricao" placeholder="Digite a descrição..."></input>
                        </div>
                        <button type="submit" className="btn btn-primary">Criar recado</button>
                    </form>
                    
                </div>
            </section>

            <div className="container">

                <div className="jumbotron-heading text-center">
                    <h2>Verifique seus recados abaixo:</h2>
                </div>
                
                <div className="row p-4">
                    {cards.map(card => (
                        <div className="col-md-4" key={card._id}>
                            <div className="card mb-4 box-shadow">
                                <div className="card-header">
                                    <h5 className="card-title">{card.titulo}</h5>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">{card.descricao}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <button type="button" onClick={deleteCard} className="btn btn-danger">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}