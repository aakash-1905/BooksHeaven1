import React, { useState,useEffect } from "react";
import { decodeToken } from "react-jwt";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";




const Navbar = () => {
const navigate = useNavigate();
  function handleLogout(){
    localStorage.removeItem('token');
    setLogged(false);
    setUser({});
    navigate("/");
  }
  const [user,setUser] = useState({});
  const [logged,setLogged] = useState(false);
  useEffect(() => {
		const token = localStorage.getItem('token')
    // console.log(token);
		if (token) {
			const user1 = decodeToken(token);
      // console.log(user1);
			if(user1){
        setUser(user1);
        setLogged(true);
      }
		}
	}, [])
  return (
    
      <section className="h-wrapper">
        <div className="flexCenter paddings innerWidth h-container">
        <Link to={`/`}>Book Heaven</Link>
          <div className="flexCenter h-menu">
            {!logged && <button className="button">
             <Link to={`/login`}>Login</Link>
            </button>}
            {logged && 
              <button className="button" onClick={()=>handleLogout()}>
                Logout
            </button>}
            {logged && 
              <button className="button">
              <Link to={`/my-books/${user.id}`}>My Books</Link>
            </button>}
            {!logged &&<button className="button">
            <Link to={`/register`}>SignUp</Link>
            </button>}
          </div>
        </div>
      </section>
    
  );
};

export default Navbar;
