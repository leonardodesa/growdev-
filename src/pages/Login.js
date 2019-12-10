import React, { useState } from 'react';
import './Login.css'

import logo from '../assets/logo.png';

import api from '../services/api';

export default function Login({ history }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        
        const response = await api.post('/', {
            login,
            password 
        });

        console.log(response);

        history.push('/main');
    }

    return (
      <div className="login-container">
        <form action="" onSubmit={handleSubmit}>
          <img src={logo} alt="Growdev" />
          <input
            type="text"
            placeholder="Digite seu Login"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
          <input
            type="password"
            placeholder="Digite sua Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    );
}