
import React, { useState,useEffect } from "react";
import { decodeToken } from "react-jwt";
import "./style.css"
const Description=({show,item,onClose})=>{
    
    const [user,setUser] = useState({});
  const [logged,setLogged] = useState(false);

    async function addToRead(item){
        var year = parseInt(String(item.volumeInfo.publishedDate).substring(0,4));
        
        const response = await fetch('http://localhost:4000/api/v1/user/addToRead', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId:user.id,
                title:item.volumeInfo.title,
                id:item.id,
                author:item.volumeInfo.authors.toString(),
                publicationYear:year,
                description:item.volumeInfo.description,
                cover: item.volumeInfo.imageLinks.smallThumbnail
			}),
		})
        const data = await response.json();
        if (data.success) {
			alert("Book Added For Reading");
		}else{
			alert(data.error)
		}
    }




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


    if(!show)
    {
        return null;
    }
    let thumbnail=item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
    return(
            <div className="overlay">
            
                <div className="overlay-inner">
                    <button className="close" onClick={onClose}>Close</button>
                    <div className="inner-box">
                        <img src={thumbnail} alt="" />
                        <div className="info">
                            <h1>{item.volumeInfo.title}</h1>
                            <h3>{item.volumeInfo.authors}</h3>
                            <h4>{item.volumeInfo.publisher}<br/>{String(item.volumeInfo.publishedDate).substring(0,4)}</h4><br/>
                            {
                                logged && <button onClick={()=>addToRead(item)}>Add To Read</button>
                            }
                        </div>
                    </div>
                    <h4 className="description">{item.volumeInfo.description}</h4>
                </div>
            </div>
    )
}
export default Description;