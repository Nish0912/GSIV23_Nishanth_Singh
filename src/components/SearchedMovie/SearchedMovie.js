import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { getLatestMovies } from "../../utility/helper";
import { customAPI, customUrlMovieDB } from "../../utility/constants";

import "./SearchedMovie.css";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import usePrevious from "../../hooks/usePrevious";

const SearchedMovie = ({ search }) => {
  const previousSearch = usePrevious(search);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const getPage = () => {
    setPage(1);
    return 1;
  }

  const fetchMovie = async () => {
    if (search?.length) {
      setLoading(true);
      setError(null);
      try {
        const movieList = await fetch(
          `${customUrlMovieDB}/search/movie?${customAPI}&query=${search}&page=${search !== previousSearch ? getPage(): page}`
        );
        const response = await movieList.json();
        const latestMovies = getLatestMovies(response?.results ?? []);
        search === previousSearch
          ? setMovies([...movies, ...latestMovies])
          : setMovies([...latestMovies]);
        search === previousSearch && setPage((prevPage) => prevPage + 1);
      } catch (error) {
        console.log(`error: ${JSON.stringify(error)}`);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if(search !== previousSearch) {
      fetchMovie();
    }
  }, [search]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight - 20 ||
      loading
    ) {
      return;
    }
    if(search === previousSearch) {
      window.scrollTo(0, document.documentElement.offsetHeight - 200);
      fetchMovie();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  if (!search) {
    return <Loader />;
  }

  // Removing duplicacy
  const MappedSearchedMovies = movies.reduce(
    (acc, x) => acc.concat(acc.find((y) => y.id === x.id) ? [] : [x]),
    []
  );
  return (
    <>
      {MappedSearchedMovies.length ? (
        <>
          <Stack className="searched-movielist-text-container">
            <Typography variant="h3">{`${MappedSearchedMovies.length} Movies Found`}</Typography>
          </Stack>
          <Stack
            className="searched-movielist-moviecard"
            sx={{
              gap: { lg: "50px", xs: "40px" },
            }}
          >
            {MappedSearchedMovies?.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Stack>
          <Stack>
            {loading && <Loader />}
            {error && <p>Error: {error.message}</p>}
          </Stack>
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default SearchedMovie;
