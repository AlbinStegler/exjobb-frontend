import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import adminModel from '../../models/adminModel';
import { handleLogin } from '../../auth/authUtils';

const Login = () => {
    const navigator = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        let res = await adminModel.checkLogin({ username, password });
        if (res.status === 200) {
            console.log('Logged in');
            handleLogin();
            navigator("/admin");
        } else {
            alert('Fel användarnamn eller lösenord');
        }
    }

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }
    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    return (
        <div className="login-container">
            <h1>Logga in</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={e => handleUsernameChange(e)} type="text" placeholder="Användarnamn" />
                <input onChange={e => handlePasswordChange(e)} type="password" placeholder="Lösenord" />
                <button>Logga in</button>
            </form>
        </div>
    );
};
export default Login;