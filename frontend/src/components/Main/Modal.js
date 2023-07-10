
import React, { useState } from "react";
import "./style.css";
const Modal = ({ show, item, onClose ,userId}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  if (!show) {
    return null;
  }

 async function addReview(item){
  const response = await fetch('http://localhost:4000/api/v1/user/addReview', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
        rating,
        review,
        bookId:item.id
			}),
		})

		const data = await response.json()

		if (data.success) {
			alert(" Review Added Successfully!!!")
		}else{
			alert(data.error)
		}
 }





  let thumbnail = item.cover;
  return (
    <div className="overlay">
      <div className="overlay-inner">
        <button className="close" onClick={onClose}>
          Close
        </button>
        <div className="inner-box">
          <img src={thumbnail} alt="" />
          <div className="info">
            <h1>{item.title}</h1>
            <h3>{item.author}</h3>
            <br />
            {String(item.publicationYear).substring(0, 4)}
            <br />
            {item.rating > 0 ? (
              <h4>{`Review : ${item.rating}`}</h4>
            ) : (
              <input placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)}/>
            )}
            <br />
            {item.review ? (
              <h4>{`Review : ${item.review}`}</h4>
            ) : (
              <input type="text" placeholder="Add Review" value={review} onChange={(e) => setReview(e.target.value)}/>
            )}
            <br />
            {!item.review && <button className="button" onClick={()=>addReview(item)}>Add Review</button>}
          </div>
        </div>
        <h4 className="description">{item.description}</h4>
      </div>
    </div>
  );
};
export default Modal;
