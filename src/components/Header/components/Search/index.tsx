import React, { useState } from "react";
import "./styles.scss";
import { searchService } from "../../../../services/base/searchService";

const Search = (props: any) => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);

  const getSearchService = async (text: string) => {
    try {
      const response = await fetch(
        `https://www.rijksmuseum.nl/api/nl/collection?key=2esrTh6M&involvedMaker=&${text}`
      );
      const result = await response.json();
      setData(result);
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
