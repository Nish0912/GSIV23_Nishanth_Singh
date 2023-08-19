import { Box } from '@mui/material';
import React from 'react';
import MovieList from '../../components/MovieList/MovieList';
import SearchedMovie from '../../components/SearchedMovie/SearchedMovie';
import useDebounce from '../../hooks/useDebounce';

const Home = ({search}) => {

  const debouncedSearch = useDebounce(search, 1000);

  return (
    <Box>
      {
        search.length ? (<SearchedMovie search={debouncedSearch}/>) : <MovieList />
      }
    </Box>
  )
}

export default Home;