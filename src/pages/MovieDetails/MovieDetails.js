import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import movie from "../../assets/movie.png";
import StarIcon from "@mui/icons-material/Star";
import HomeIcon from "@mui/icons-material/Home";
import Skeleton from "../../components/Skeleton/Skeleton";

import "./MovieDetails.css";
import { getMovieCasts, getMovieDirectors, getMovieLength } from "../../utility/helper";
import { customUrlMovieDB, customAPI } from '../../utility/constants';

const MovieDetails = () => {
  const [currentMovieDetail, setCurrentMovieDetail] = useState(null);
  const { id } = useParams();


  const getData = async () => {
    const movieList = await fetch(
      `${customUrlMovieDB}/movie/${id}?${customAPI}`
    );
    const movieDetails = await movieList.json();

    const movieCreditors = await fetch(
      `${customUrlMovieDB}/movie/${id}/credits?${customAPI}`
    );
    const creditors = await movieCreditors.json();
    setCurrentMovieDetail({ ...movieDetails, ...creditors });
  };

   
  useEffect(() => {
    getData();
  }, []); 




  const getRating = (vote_average) => {
    if (vote_average === 0) {
      return "(Not Yet Rated)";
    }
    return (
      <Stack direction={"row"}>
        {currentMovieDetail ? `${vote_average}` : ""}
        <StarIcon className="starIcon" />
      </Stack>
    );
  };

  const {
    original_title = "",
    poster_path = "",
    vote_average = 0,
    runtime = 0,
    release_date = "",
    overview = "",
    cast = [],
    crew = [],
  } = currentMovieDetail ?? {};

  const movieYear = new Date(release_date).getFullYear();
  const movieLength = getMovieLength(runtime);
  const movieDirectors = getMovieDirectors(crew);

  return (
    <Stack className="movie-details">
      <Stack className="movie-navbar">
        <Typography className="header-left">
          Movie Details
        </Typography>
        <Link className="header-right" to="/">
          <HomeIcon />
        </Link>
      </Stack>
      <Stack className="movie-container">
        <Stack className="movie-left">
          {currentMovieDetail ? (
            <img
              className="movie-poster-img"
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/original${poster_path}`
                  : movie
              }
              alt={original_title}
            />
          ) : (
            <Skeleton
              height={400}
              width={400}
            />
          )}
        </Stack>
        <Stack className="movie-right">
          <Stack className="movie__name">
            <Typography className="movieName" variant="h5">
              {currentMovieDetail ? (
                original_title + " "
              ) : (
                <Skeleton
                />
              )}
            </Typography>
            <Typography variant="h5">
              {currentMovieDetail ? (
                getRating(vote_average)
              ) : (
                <Skeleton
                />
              )}
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="h5" color={"#000000"}>
              {currentMovieDetail ? (
                `${movieYear}  |  ${movieLength}  |  ${movieDirectors}`
              ) : (
                <Skeleton
                  width={500}
                />
              )}
            </Typography>
          </Stack>
          <Stack className="movie">
            <Typography variant="h5" color={"#000000"}>
              {currentMovieDetail ? (
                `Cast: `
              ) : (
                <Skeleton
                />
              )}
            </Typography>
            <Typography color={"#000000"}>
              {currentMovieDetail ? (
                getMovieCasts(cast)?.join(", ")
              ) : (
                <Skeleton
                  height={200}
                  width={600}
                />
              )}
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="h5" color={"#000000"}>
              {currentMovieDetail ? (
                `Description: `
              ) : (
                <Skeleton
                />
              )}
            </Typography>
            <Typography color={"#000000"}>
              {currentMovieDetail ? (
                overview
              ) : (
                <Skeleton
                  height={200}
                  width={600}
                />
              )}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MovieDetails;
