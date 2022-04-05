import React, { useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";
import styles from "./SearchBar.module.css";
import Router from 'next/router';
import {
  useAppDispatch,
  useAppSelector,
} from '../../store/hooks';
import { getSearch, setQuery } from 'features/searchSlice';
import { searchQuerySelector } from 'features/searchSlice/selectors'

const Search = ({ hideButtons = false }) => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(searchQuerySelector);

  useEffect(() => {
    const url = new URL(window.location.href);
    const term = url.searchParams.get("term");
    if(term){
      dispatch(setQuery(term))
      dispatch(getSearch(term))
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getSearch(query));
    Router.push(`/search?term=${query}`);
  };

  return (
    <form className={styles.search} onSubmit={(e) => onSubmit(e)}>
      <div className={styles.search__input}>
        <SearchIcon className={styles.search__inputIcon} />
        <input value={query} onChange={(e) => dispatch(setQuery(e.target.value))}/>
      </div>

      {!hideButtons ? (
        <div className={styles.search__buttons}>
          <Button onClick={onSubmit}>Google Search</Button>
          <Button onClick={() => onSearch(true)}>I'm Feeling Lucky</Button>
        </div>
      ) : (
        <div></div>
      )}
    </form>
  );
}

export default Search;