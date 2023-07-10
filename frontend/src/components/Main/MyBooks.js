
import React, { useState,useEffect } from "react";
import {useParams} from 'react-router-dom';
import Modal from './Modal';
import axios from "axios";

const MyBooks = () => {
    const [show, setShow] = useState(false);
    const [bookItem, setItem] = useState();
    const [myUser, setMyUser] = useState([]);
    const params = useParams();

   useEffect(() => {
        axios.get("http://localhost:4000/api/v1/user/getUser?id="+params.id)
            .then(res =>{
                const user = res.data.userGot.books;
                setMyUser(user);  
                console.log(user)
            })
            .catch(err => console.error(err))
		},[]);

        return (
            <section className="Main-wrapper">
              <div className="paddings innerWidth flexCenter Main-container ">
                {myUser.length >0 ? myUser.map((item) => {
                  let thumbnail =
                    item.cover;
                  
                  if (thumbnail !== undefined) {
                    return (
                      <div key={item.id}>
                        <div 
                          className="card"
                          onClick={() => {
                            setShow(true);
                            setItem(item);
                          }}
                        >
                          <img src={thumbnail} alt="" />
                          <div className="bottom">
                            <h3 className="title">{item.title}</h3>
                          </div>
                          <button className="button" >Read More</button>
                        </div>
                        <Modal show={show} userId={params.id} item={bookItem} onClose={()=>setShow(false)}/>
                      </div>
                    );
                  }
                }) : <h1 className="text">Add Books to read...</h1>}
              </div>
            </section>
          );
}

export default MyBooks