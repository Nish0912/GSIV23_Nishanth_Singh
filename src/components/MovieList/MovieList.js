import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { getLatestMovies } from "../../utility/helper";

import { setMovies } from "../../redux/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { customAPI, customUrlMovieDB } from "../../utility/constants";

import "./MovieList.css";

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);

  const [categoryMovieList, setCategoryMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchMovieList = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const movieList = await fetch(
        `${customUrlMovieDB}/movie/upcoming?${customAPI}&page=${page}`
      );
      const movies = await movieList.json();
      const latestMovies = getLatestMovies(movies?.results ?? []);
      setCategoryMovieList((prevMovies) => [...prevMovies, ...latestMovies]);
      dispatch(setMovies([...categoryMovieList, ...latestMovies]));
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.log(`error : ${error}`);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [categoryMovieList, dispatch, page]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight - 20 ||
      isLoading
    ) {
      return;
    }
    fetchMovieList();
    window.scrollTo(0, document.documentElement.offsetHeight - 200);
  }, [fetchMovieList, isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    fetchMovieList();
  }, [fetchMovieList]);

  // Removing duplicacy
  const mappedMovies = movies.reduce(
    (acc, x) => acc.concat(acc.find((y) => y.id === x.id) ? [] : [x]),
    []
  );

  return (
    <div className="movielist-container">
      <Stack className="movielist-text-container">
        <Typography variant="h3">Latest Movies</Typography>
      </Stack>
      <Stack
        className="movielist-moviecard"
        sx={{
          gap: { lg: "50px", xs: "40px" },
        }}
      >
        {mappedMovies?.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Stack>
      <Stack>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </Stack>
    </div>
  );
};

export default MovieList;
