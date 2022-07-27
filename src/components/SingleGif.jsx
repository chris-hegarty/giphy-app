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
        {/* If you want to use the if else pattern you have to have the returns inside of it. Basically the only way you can use an if else and not use the { } and && is if it's a situation where you render one of two things total. In our situation it's only conditionally rendering one part of the component with the rest always being there. So we have to use the && pattern. */}
        
                {isFavorite && (
                        
                            <button className="remove-favorite" onClick={ () => { remove(gif_id) } } >
                                < AiFillHeart />
                            </button>
                )}

                {!isFavorite && (     

                            <button className="add-favorite" onClick={ () => { add(gif) } } >
                                < AiOutlineHeart />
                            </button>

                )}      
                                                           
        </div>    
    
    )   

}

export default SingleGif;