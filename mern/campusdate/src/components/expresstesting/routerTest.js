// import React from "react";

// function LoadBackground() {
//   //const [isLoading, setIsLoading] = React.useState(true);
//   const [data, setData] = React.useState([]);

//   React.useEffect(() => {
//     const url = "/test";
//     fetch(url)
//       .then((response) => response.json())
//       .then((json) => setData(json['results']))
//       .catch((error) => console.log(error));
//   }, []);


// }
import axios from 'axios';

import React, { useEffect, useState } from "react";

export default function Test() {
    const [items, setItems] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error,setError] = useState(null);



    //This code uh shits itself to be frank. There is  fetch error and somehow an uncaught promise error. 
    // useEffect(() => {
    //     fetch("/test")
    //         .then(response => {
    //             if (response.ok){
    //                 console.log(response.json())
    //                 setItems(response.json())
    //             }
    //             throw response;
    //         })
    //         .then(items => {
    //             setItems(items);
    //         })
    //         .catch(error => {
    //             console.error("Error fetching data: ",error);
    //             setError(error);
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         })
    // }, [])
    useEffect(() => {
        axios.get('/test')
        .then(function (response) {
            // handle success
            setItems(response);
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.error("Error fetching data: ",error);
            setError(error);
        })
        .finally(function () {
            // always executed
            setLoading(false);
         });
    },[])















    if (loading) return "Loading...";
    if (error) return "ERROR!";

    if(items.length > 0) return {items};

    return(
        <div></div>)


}

