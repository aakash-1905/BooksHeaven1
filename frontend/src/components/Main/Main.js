import React, { useContext, useState } from "react";
import BooksContext from "../../context/BooksContext";

import Description from "./Description";

import './style.css';
const Main = () => {
    
  const [show, setShow] = useState(false);
  const [bookItem, setItem] = useState();
  const books = useContext(BooksContext);

  return (
    <section className="Main-wrapper">
      <div className="paddings innerWidth flexCenter Main-container ">
        {books.map((item) => {
          var thumbnail =
            item.volumeInfo.imageLinks &&
            item.volumeInfo.imageLinks.smallThumbnail;
            return (
              <div key={item.id}>
              {console.log(item)}
                <div 
                  className="card"
                  onClick={() => {
                    setShow(true);
                    setItem(item);
                  }}
                >
                  {thumbnail!==undefined?<img src={thumbnail} alt=""/>:<img src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=" alt=""/>}
                  <div className="bottom">
                    <h3 className="title">{item.volumeInfo.title}</h3>
                  </div>
                  <button className="button" >Read More</button>
                </div>
                <Description show={show} item={bookItem} onClose={()=>setShow(false)}/>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
};

export default Main;
