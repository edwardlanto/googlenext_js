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
import { searchQuerySelector } from 'features/searchSlice/selectors';
import axios from 'axios';

const Search = ({ hideButtons = false }) => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(searchQuerySelector);

  useEffect(() => {
    const url = new URL(window.location.href);
    const term = url.searchParams.get("term");
    if (term) {
      dispatch(setQuery(term))
      dispatch(getSearch(term))
    }
  }, []);

  const onSubmit = (e) => {
    if (query) {
      e.preventDefault();
      dispatch(getSearch(query));
      Router.push(`/search?term=${query}`);
    }
  };

  const onSubmitLucky = async (e) => {
    if (query) {
      try {
        const linkPromise = await axios(`https://www.googleapis.com/customsearch/v1?key=${process.env.REACT_APP_API_KEY}&cx=${process.env.REACT_APP_CONTEXT_KEY}&q=${query}`);
        const windowLocation = linkPromise.data.items[0].formattedUrl;
        return window.open(windowLocation, '_blank');
      } catch (e) {
        return alert('Could not find link. Please try another query,');
      }
    }
  }

  return (
      <form className={styles.search} onSubmit={(e) => onSubmit(e)}>
        <div className={styles.search__input}>
          <SearchIcon className={styles.search__inputIcon} />
          <input value={query} onChange={(e) => dispatch(setQuery(e.target.value))} data-cy="search__input" />
        </div>
        {!hideButtons ? (
          <div className={styles.search__buttons}>
            <Button onClick={onSubmit} data-cy="search__submit" type="button">Google Search</Button>
            <Button onClick={(e) => onSubmitLucky(e)} data-cy="search__submitLucky" type="button">I'm Feeling Lucky</Button>
          </div>
        ) : (
          <div></div>
        )}
      </form>
  );
}

export default Search;