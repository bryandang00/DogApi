import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import axios from 'axios'
import Carousel from './Carousel'
function App() {
  const [randomDog, setRandomDog] = useState(null)
  const [search, setSearch] = useState('')
  const [breed, setBreed] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  console.log(breed)
  const newDog = async () => {
    setIsLoading(true)
    let result = await axios.get("https://dog.ceo/api/breeds/image/random")
    setIsLoading(false)
    setBreed('')
    setRandomDog(result.data.message)
  }

  const getBreed = async () => {
    let result = await axios(`https://dog.ceo/api/breed/${search}/images/random`)
    setBreed(result.data.message)
  }

  useEffect(() => {
    const fetchDogs = async () => {
      setIsLoading(true)
      const res = await axios(
        "https://dog.ceo/api/breeds/image/random",
      );
      setRandomDog(res.data.message)
      setIsLoading(false)
    };
    fetchDogs();
  }, [breed])
  return (
    <Fragment>
      {isLoading ? (<div><h1>Loading...</h1></div>) :
      <div className="App">
        <h1>Doggos and Puppers</h1>
        {breed.length > 0 ? <img className='dogPics' src={breed} /> : <img className = 'dogPics' src={randomDog} />}
        <div>
          <input type='text' value={search} onChange={e => setSearch(e.target.value)} />
          {search.length > 0 ?
            (<button className="btn" onClick={getBreed}>search</button>)
            :
            (<button className="btn" onClick={newDog} >Another one</button>)}
        </div>
      </div>}
      <Carousel />
    </Fragment>
  );
}

export default App;
