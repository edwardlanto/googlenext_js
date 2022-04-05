import React from "react";
import Link from 'next/link';
import SearchBar from "../../components/SearchBar";
import styles from "./search.module.css";
import { searchItemsSelector, searchInformationSelector, searchErrorSelector } from 'features/searchSlice/selectors';
import {
  useAppSelector,
} from 'store/hooks';

const SearchPage = () => {
  const items = useAppSelector(searchItemsSelector);
  const searchInformation = useAppSelector(searchInformationSelector);
  const error = useAppSelector(searchErrorSelector);
  const handleError = (src, index) => {

    // Error handle all broken images
    const errorImages = document.getElementsByClassName(
      `searchPage__resultImage`
    );

    // Access HTML Collection
    if (errorImages.item(index)) {
      errorImages.item(index).style.display = "none";
    }
  };

  return (
    <div className={styles.searchPage}>
      <div className={styles.searchPage__header}>
        <Link href="/">
          <img
            src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
            alt="Google logo"
            className={styles.searchPage__logo}
          />
        </Link>
        <div className={styles.searchPage__logo}>
          <SearchBar hideButtons />
        </div>
      </div>
      <div className={styles.searchPage__results}>
        <p className={styles.searchPage__resultCount}>
          About {searchInformation.formattedTotalResults} results (
          {searchInformation.formattedSearchTime} seconds)
        </p>
        {error ? <div>{error}</div> : items?.length ? items.map((item, index) => {
          return (
            item.pagemap?.cse_image?.[0] && (
              <div className={styles.searchPage__result} key={index}>
                <a href={item.link}>
                  <img
                    src={item.pagemap.cse_image?.[0]?.src}
                    className={styles.searchPage__resultImage}
                    alt={`result thumbnail`}
                    onError={() =>
                      handleError(item.pagemap.cse_image?.[0].src, index)
                    }
                  />
                </a>
                <a href={item.link}>{item.displayLink}</a>
                <a href={item.link} className={styles.searchPage__resultTitle}>
                  <h2>{item.title}</h2>
                </a>
                <p className={styles.searchPage__resultSnippet}>{item.snippet}</p>
              </div>
            )
          );
        }) : <div><p>No Results, please try another search term.</p></div>}
      </div>
    </div>
  );
}


export default SearchPage;
