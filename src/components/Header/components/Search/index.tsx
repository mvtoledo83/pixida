import React, { useContext, useState } from "react";
import "./styles.scss";
import searchContext from "../../../../context/searchContext";
import searchCountContext from "../../../../context/searchCountContext";
import searchInputContext from "../../../../context/searchInputContext";
import searchLoadingContext from "../../../../context/searchLoadingContext";

const Search = (props: any) => {
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");
  const { setSearchResult } = useContext(searchContext);
  const { setCountResult } = useContext(searchCountContext);
  const { setSearchInput } = useContext(searchInputContext);
  const { setSearchLoading } = useContext(searchLoadingContext);

  const getSearchService = async (text: string) => {
    if (!text) {
      document.getElementById(
        "artapi-layout-header-search-input"
      ).style.background = "#ff000022";
      setError("Please type something");
    } else {
      try {
        setSearchLoading(true);
        const response = await fetch(
          `https://www.rijksmuseum.nl/api/en/collection?key=2esrTh6M&search?q=${text}`
        );
        setSearchInput(text);
        const result = await response.json();
        setSearchResult(result);
        const filteredCount = result.count;
        setCountResult(filteredCount);
        setSearchLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <section
      id="artapi-layout-header-search"
      className="artapi-layout-header-search"
    >
      <input
        id="artapi-layout-header-search-input"
        className="artapi-layout-header-search-input"
        type="text"
        placeholder={error ? error : "Please type in your search"}
        onChange={(e) => {
          setSearchText(e.target.value);
          setError("");
          document.getElementById(
            "artapi-layout-header-search-input"
          ).style.background = "inherit";
        }}
      />
      <button
        id="artapi-layout-header-search-button"
        className="artapi-layout-header-search-button"
        type="submit"
        onClick={() => getSearchService(searchText)}
      >
        Search
      </button>
    </section>
  );
};

export default Search;
