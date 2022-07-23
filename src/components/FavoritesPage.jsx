import React, {useState, useContext} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {FavoritesContext} from "../context/FavoritesContext";
import useAxios from "../hooks/useAxios"
import { FaHeart } from 'react-icons/fa';
import { UserContext } from "../context/UserContext";


function FavoritesPage(props){
    const {favorites, add, remove}= useContext(FavoritesContext);
    const loggedInUser = useContext(UserContext)

    return(
        <div className="parent-section flex flex-wrap">
            {data && data.map((data, idx) => (
            <div key={idx}>
                <img
                    onClick={(data) => (data)}
                    src={data.url}
                    alt={data.title}
                />
                {!isFavorite &&

                <button
                    className="favorite-icon"
                    onClick={((e) => {

                    }
                    )}
                >
                    < FaHeart />
                </button>
                }           
            </div>
            ))}
        </div>
    )
}

export default FavoritesPage;