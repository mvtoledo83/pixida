import React, { useMemo, useState } from "react";
import AppRoutes from "./config/routes";
import searchContext from "./context/searchContext";
import searchCountContext from "./context/searchCountContext";
import searchInputContext from "./context/searchInputContext";

export default function Root() {
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [countResult, setCountResult] = useState<any>(null);
  const [searchInput, setSearchInput] = useState<any>(null);

  const searchResultValue = useMemo(
    () => ({ searchResult, setSearchResult }),
    [searchResult, setSearchResult]
  );
  const searchInputValue = useMemo(
    () => ({ searchInput, setSearchInput }),
    [searchInput, setSearchInput]
  );
  const countResultValue = useMemo(
    () => ({ countResult, setCountResult }),
    [countResult, setCountResult]
  );

  return (
    <searchContext.Provider value={searchResultValue}>
      <searchInputContext.Provider value={searchInputValue}>
        <searchCountContext.Provider value={countResultValue}>
          <AppRoutes />
        </searchCountContext.Provider>
      </searchInputContext.Provider>
    </searchContext.Provider>
  );
}
