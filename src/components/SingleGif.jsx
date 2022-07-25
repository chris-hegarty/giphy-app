import React from "react";
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';

function SingleGif({ gif, add, remove, isFavorite,  }){
const{gif_id, title, url} = gif
return(
    
        <div>
            <h3>{gif.title}</h3>
            <img
                onClick={(gif) => (gif)}
                src={gif.url}
                alt={gif.title}
            />
            {
                <>
                    {
                        <button
                            className="remove-favorite"
                            onClick={((e) => {
                                remove(gif.id);
                            }
                            )}
                        >
                            < AiFillHeart />
                        </button>
                    }
                    <button
                        className="add-favorite"
                        onClick={((e) => {
                            add(gif);
                        }
                        )}
                    >
                        < AiOutlineHeart />
                    </button>
                </>


            }
        </div>    
    
    
    
)

}

export default SingleGif;