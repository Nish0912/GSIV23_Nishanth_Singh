export const getLatestMovies = (movies) => {
  return movies.toSorted(
    (first, second) =>
      Number(new Date(second.release_date)) -
      Number(new Date(first.release_date))
  );
};

export const getMovieLength = (runtime) => {
  if (runtime === 0) {
    return "Runtime Yet Unknown";
  }
  const hr = Math.floor(runtime / 60);
  const min = runtime % 60;
  return `${hr} HR : ${min} MIN`;
};

export const getMovieDirectors = (crew) => {
  if (crew?.length) {
    const tempcrew = crew.filter((eachCrew) => eachCrew?.job === "Director");
    return tempcrew?.[0]?.original_name;
  }
};

export const getMovieCasts = (cast) => {
  if (cast?.length) {
    const tempcasts = cast.map((eachcast) => eachcast?.original_name);
    return tempcasts;
  }
};
