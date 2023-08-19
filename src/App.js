import React, { useState } from "react";

import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import MovieDetails from "./pages/MovieDetails/MovieDetails";

import "./App.scss";
import NotFound from "./components/NotFound/NotFound";

function App() {
  const [search, setSearch] = useState("");
  
  return (
    <>
      <div className="movie-App">
      <Navbar
          search={search}
          setSearch={setSearch}
        />
        <Routes>
          <Route
            index
            path="/movieapp"
            element={
              <Home search={search}/>
            }
          />
          <Route path="/movieapp/movie/:id" element={<MovieDetails />} />
          <Route path="/*" element={<Home search={search} />} />
        </Routes>
    </div>
    </>
  );
}

export default App;
