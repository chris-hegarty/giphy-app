import { useState, useEffect } from "react";
import axios from "axios";


const baseUrl = "https://api.giphy.com/v1/gifs/search?api_key=Kljl21HbtxWMTX68EbeomPuzwqVuvu7e&limit=50&offset=0&lang=en&rating=";

function useAxios(url){
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    // const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if(url.length === 0 ){
            return
        }
        async function init(){
            // setLoading(true);
            setError(null);
            setData(null);
            try {
                const response = await axios.get(baseUrl + url);
                // console.log(response.data.data);
                const gifs = response.data.data.map((val) => ({
                    title: val.title,
                    url: val.images.original.url,
                    gif_id: val.id           
                }));
                setData(gifs);
                console.log(response.data.data);
                console.log(url);

            } catch(e) {
                setError("Something went wrong.");
            } 
            
        }
        init();

    },[url])
    
    return {data, error};
}

export default useAxios