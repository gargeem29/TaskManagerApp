import React, { useState } from 'react';
import { login } from '../api/authAPI'; // Adjust this import to your actual API function
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login({ email, password });
            onLoginSuccess();
            navigate('/');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" style={{
                    marginTop: '20px',
                }}>Login</button>

                <div style={{
                    marginTop: '20px',
                    width: '100%',
                }}>
                    <p style={{
                        textAlign: 'center',
                    }}>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
