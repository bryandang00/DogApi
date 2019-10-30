import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import './App.css'

const Carousel = () => {
    const [dogArray, setDogArray] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const fetchDogs = async () => {
            setIsLoading(true)
            const res = await axios(
                'https://dog.ceo/api/breeds/image/random/6',
            );
            setDogArray(res.data.message)
            setIsLoading(false)
        };
        fetchDogs();
    }, [])

    return (
        <Fragment>
            {isLoading ? (<div><h1>Loading...</h1></div>) :
                <div id="carouselContainer">
                    {dogArray.map((dog, i) => {
                        return (
                            <div key={i}>
                                <img src={dog} className="carouselPics" />
                            </div>
                        )
                    })}
                </div>}
        </Fragment>
    )
}
export default Carousel