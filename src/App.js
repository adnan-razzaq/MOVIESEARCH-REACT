import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Movie from "./components/Movie";
import Search from "./components/Search";

const url = "http://www.omdbapi.com/?s=superman&apikey=511ade6b";

function App() {
  /* states */
  const [loading, setloading] = useState(true);
  const [movies, setmovies] = useState([]);
  const [error, seterror] = useState(null);

  /* getting data from api */
  useEffect(() => {
    const getdata = async function () {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      return data;
    };
    getdata().then((data) => {
      setmovies(data.Search);
      setloading(false);
    });
  }, []);
  //search

  const search = (searchvalue) => {
    setloading(true);
    seterror(null);
    const getdata = async function () {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${searchvalue}&apikey=511ade6b`
      );
      const data = await response.json();
      return data;
    };
    getdata().then((data) => {
      if (data.Response === "True") {
        setmovies(data.Search);
        setloading(false);
      } else {
        seterror(data.Error);
        setloading(false);
      }
    });
  };
  return (
    <>
      <div className="App">
        <Header text="Search Movie" />
        <Search search={search} />
        <p className="App-intro">Sharing a few of our favourite movies</p>
        <div className="movies">
          {loading && !error ? (
            <span>loading...</span>
          ) : error ? (
            <div className="errorMessage">{error}</div>
          ) : (
            movies.map((movie, index) => (
              <Movie key={`${index}-${movie.Title}`} movie={movie} />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
