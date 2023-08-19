import React from "react";
import { Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import SearchComp from "../SearchComponent/SearchComp";
import useCurrentPath from "../../hooks/useCurrentPath";

const Navbar = ({ search, setSearch }) => {
  const currentPath = useCurrentPath();
  const hasId = (currentPath ?? "").includes("id");
  
  return (
    <Stack className={`header${hasId ? "-hide" : ""}`}>
      <Stack className="header-left">
        <Link
          to="/movieapp"
          className="link-text"
          onClick={() => setSearch("")}
        >
        </Link>
        <SearchComp search={search} setSearch={setSearch} />
      </Stack>
      <Stack className="header-right">
        <Link to="/movieapp" onClick={() => setSearch("")}>
          <HomeIcon />
        </Link>
      </Stack>
    </Stack>
  );
};

export default Navbar;
