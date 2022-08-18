import React from "react";
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';

function SingleGif({ gif, add, remove, isFavorite }){
const{gif_id, title, url} = gif
return (
	<div className="image-relative single-gif border-orange-600 border-2">
		<img src={url} alt={title} onClick={(gif) => gif} />
		{isFavorite && (
			<button
				className="fav-heart remove-favorite"
				onClick={() => {
					remove(gif_id);
				}}
			>
				<AiFillHeart />
			</button>
		)}

		{!isFavorite && (
			<button
				className="fav-heart add-favorite"
				onClick={() => {
					add(gif);
				}}
			>
				<AiOutlineHeart />
			</button>
		)}
	</div>
);   

}

export default SingleGif;