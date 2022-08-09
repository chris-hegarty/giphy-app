import React from "react";
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

function SingleGif({ gif, add, remove, isFavorite,  }){
const{gif_id, title, url} = gif
return(
        

           <div className="image-relative">
            <img
                onClick={(gif) => (gif)}
                src={url}
                alt={title}
            />
            {isFavorite && (

                <button className="fav-heart remove-favorite" onClick={() => { remove(gif_id) }} >
                    < AiFillHeart />
                </button>
            )}

            {!isFavorite && (

                <button className="fav-heart add-favorite" onClick={() => { add(gif) }} >
                    < AiOutlineHeart />
                </button>

            )}     
         </div>
        
                
                                                           

    
    )   

}

export default SingleGif;