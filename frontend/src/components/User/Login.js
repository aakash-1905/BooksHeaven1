import React from 'react'
import { useState } from 'react'
import './LoginSignUp.css'
const Login = () => {
    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {
		event.preventDefault()
        // console.log("login")

		const response = await fetch('http://localhost:4000/api/v1/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()
        
		if (data.user) {
			localStorage.setItem('token', data.token)
			alert('Login successful')
			window.location.href = '/'
		} else {
			alert('Please check your username and password')
		}
	}

	return (
		<section className="section">
        <div className="form-box">
            <div className="form-value">
                <form onSubmit={loginUser}>
                    <h2>Login</h2>
                    <div className="inputbox">
                        <input type="text" 
						onChange={(e) => setEmail(e.target.value)} 
						value={email} required/>
                        <label >Email</label>
                    </div>
                    <div className="inputbox">
                        <input type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)} required/>
                        <label >Password</label>
                    </div>
                    <input type="submit" value="Login" className="btn"/>
                </form>
            </div>
        </div>
    </section>
	)
}

export default Login