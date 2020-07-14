import React, { useState, useEffect, useReducer } from "react";
import "./App.css";
import Header from "./components/Header";
import Movie from "./components/Movie";
import Search from "./components/Search";

const url = "http://www.omdbapi.com/?s=superman&apikey=511ade6b";
const initialState = {
  loading: true,
  movies: [],
  errorMessage: null,
};
//reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case "SUCCESS": {
      return {
        ...state,
        movies: action.response,
        loading: false,
      };
    }
    case "ERROR": {
      return {
        ...state,
        errorMessage: action.error,
        loading: false,
      };
    }
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { movies, loading, errorMessage } = state;

  /* states */
  /*  const [loading, setloading] = useState(true);
  const [movies, setmovies] = useState([]);
  const [error, seterror] = useState(null); */

  /* getting data from api */
  useEffect(() => {
    const getdata = async function () {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    };
    getdata().then((data) => {
      /*  setmovies(data.Search);
      setloading(false); */
      dispatch({
        type: "SUCCESS",
        response: data.Search,
      });
    });
  }, []);
  //search

  const search = (searchvalue) => {
    dispatch({
      type: "REQUEST",
    });
    /* setloading(true);
    seterror(null); */
    const getdata = async function () {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${searchvalue}&apikey=511ade6b`
      );
      const data = await response.json();
      return data;
    };
    getdata().then((data) => {
      if (data.Response === "True") {
        dispatch({ type: "SUCCESS", response: data.Search });
        /* setmovies(data.Search);
        setloading(false); */
      } else {
        dispatch({ type: "ERROR", error: data.Error });
        /* seterror(data.Error);
        setloading(false); */
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
          {loading && !errorMessage ? (
            <span>loading...</span>
          ) : errorMessage ? (
            <div className="errorMessage">{errorMessage}</div>
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
