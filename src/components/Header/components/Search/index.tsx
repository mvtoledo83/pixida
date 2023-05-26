import React, { useContext, useState } from "react";
import "./styles.scss";
import searchContext from "../../../../context/searchContext";
import searchCountContext from "../../../../context/searchCountContext";
import searchInputContext from "../../../../context/searchInputContext";

const Search = (props: any) => {
  const [searchText, setSearchText] = useState("");
  const { setSearchResult } = useContext(searchContext);
  const { setCountResult } = useContext(searchCountContext);
  const { setSearchInput } = useContext(searchInputContext);

  const getSearchService = async (text: string) => {
    try {
      const response = await fetch(
        `https://www.rijksmuseum.nl/api/nl/collection?key=2esrTh6M&involvedMaker=&${text}`
      );
      const textInput = JSON.stringify(text);
      setSearchInput(textInput);
      const result = await response.json();
      setSearchResult(result);
      const filteredCount = result.count;
      setCountResult(filteredCount);
    } catch (error) {
      console.error("Error:", error);
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
        placeholder="Please type in your search"
        onChange={(e) => setSearchText(e.target.value)}
      ></input>
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
