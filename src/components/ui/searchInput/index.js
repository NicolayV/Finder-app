import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import debounce from "lodash.debounce";

import { setSearchInit, setSearchedMovie } from "../../../ducks/movie";

import { useStyles } from "./style";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearIcon from "@material-ui/icons/Clear";
import { InputBase, IconButton } from "@material-ui/core";

export const SearchInput = () => {
  const classes = useStyles();
  let history = useHistory();

  const searchInput = useRef(null);
  const dispatch = useDispatch();

  const handlerSearch = debounce((searchText) => {
    dispatch(setSearchInit());
    dispatch(setSearchedMovie(searchText));
    history.push("/search");
  }, 1000);

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="clear"
              onClick={() => (searchInput.current.value = "")}
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        }
        inputRef={searchInput}
        onChange={(e) => handlerSearch(e.target.value)}
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
};
