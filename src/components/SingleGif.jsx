import React from "react";
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';

function SingleGif({ gif, add, remove, isFavorite,  }){
const{gif_id, title, url} = gif
return(
        <div>
           
           <h3>{title}</h3>
            <img
                onClick={(gif) => (gif)}
                src={url}
                alt={title}
            />

            if(isFavorite){
                <button className="remove-favorite" onClick={ () => { remove(gif_id) } } >
                    < AiFillHeart />
                </button>
            }
                
            if(!isFavorite){
            <button className="add-favorite" onClick={ () => { add(gif) } } >
                < AiOutlineHeart />
            </button>
            }                                                     
            
        </div>    
    
    )   

}

export default SingleGif;