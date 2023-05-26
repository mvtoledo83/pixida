import React, { useState } from "react";
import AppRoutes from "./config/routes";
import searchContext from "./context/searchContext";

export default function Root() {
  const [searchResult, setSearchResult] = useState<any[]>([]);

  return (
    <searchContext.Provider value={{ searchResult, setSearchResult }}>
      <AppRoutes />
    </searchContext.Provider>
  );
}
