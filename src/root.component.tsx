import React, { useState } from "react";
import AppRoutes from "./config/routes";
import searchContext from "./context/searchContext";
import searchCountContext from "./context/searchCountContext";
import searchInputContext from "./context/searchInputContext";

export default function Root() {
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [countResult, setCountResult] = useState<any>(null);
  const [searchInput, setSearchInput] = useState<any>(null);

  return (
    <searchContext.Provider value={{ searchResult, setSearchResult }}>
      <searchInputContext.Provider value={{ searchInput, setSearchInput }}>
        <searchCountContext.Provider value={{ countResult, setCountResult }}>
          <AppRoutes />
        </searchCountContext.Provider>
      </searchInputContext.Provider>
    </searchContext.Provider>
  );
}
