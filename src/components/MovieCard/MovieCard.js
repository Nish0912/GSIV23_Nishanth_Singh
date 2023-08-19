import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import StarIcon from "@mui/icons-material/Star";
import Skeleton from "../Skeleton/Skeleton";

import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <Skeleton height={450} width={275} />
      ) : (
        <Link
          title={movie?.title}
          className="movie-card"
          to={`/movieapp/movie/${movie?.id}`}
        >
          <img
            src={`https://image.tmdb.org/t/p/original${
              movie ? movie.poster_path : ""
            }`}
            alt={movie?.title}
            loading="lazy"
          />
          <Stack className="movie-detail">
            <Stack direction={"row"} className="movie-detail-top">
              <Typography className="movie-title">{movie?.title}</Typography>
              <Stack className="movie-rating" direction={"row"}>
                <Typography className="movie-rating-value">
                  {movie?.vote_average === 0
                    ? "Not Rated"
                    : movie?.vote_average}
                </Typography>
                {movie?.vote_average === 0 ? null : (
                  <StarIcon className="starIcon" />
                )}
              </Stack>
            </Stack>
            <Typography className="movie-overview">
              {movie?.overview}
            </Typography>
          </Stack>
        </Link>
      )}
    </>
  );
};

export default MovieCard;
