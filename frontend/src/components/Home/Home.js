import {useState,useContext}from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import BooksDispatch from "../../context/BooksDispatch";
import "./Home.css";
function Home() {
  const dispatch = useContext(BooksDispatch); 
  // console.log(dispatch);
  const navigate = useNavigate();
  const [search,setSearch]=useState("");
  const searchBook=()=>{
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyBeelvV-1nFRj3VAt0UpBwKSpeN1rg4b1Y&maxResults=5`)
        // .then(res=>setData(res.data.items))
        .then(res=>dispatch({type:'Search',payload:res.data.items}))
        .catch(err=>console.log(err))
        // dispatch({type:'Search',payload:bookData});
        navigate('/books');
    }
    
  return (

    <section className="home-wrapper">
      <div className="paddings innerWidth flexCenter home-container ">
        <div className="flexColStart home-left">
          <div className="home-title">
          <div className="orange-circle"/>
            <h1>
              Books Are <br />
              The Best Friends.
            </h1>
          </div>
          <div className="flexColStart home-des">
            <span>Find Your Perfect Friend Here...</span>
          </div>
          <div className="flexCenter search-bar">
          <input type="text" value={search} onChange={e=>setSearch(e.target.value)}/>
          <button className="button" onClick={searchBook}>Search</button>
          </div>
        </div>
        <div className="flexCenter home-right">
          <div className="image-container">
            <img src="./main.jpg" alt="Main" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
