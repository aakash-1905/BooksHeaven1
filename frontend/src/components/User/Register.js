import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginSignUp.css'

function App() {
	const navigate = useNavigate();

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:4000/api/v1/user/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.success) {
			navigate('/login')
		}else{
			alert(data.error)
		}
	}

	return (
		
		<section className="section">
        <div className="form-box">
            <div className="form-value">
                <form onSubmit={registerUser}>
                    <h2>Register</h2>
                    <div className="inputbox">
                        <input value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                         required/>
                        <label >Name</label>
                    </div>
                    <div className="inputbox">
                        <input 
                        value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email" required/>
                        <label >Email</label>
                    </div>
                    <div className="inputbox">
                        <input type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required/>
                        <label >Password</label>
                    </div>
                    <input type="submit" value="Register" className="btn"/>
                </form>
            </div>
        </div>
    </section>
	)
}

export default App