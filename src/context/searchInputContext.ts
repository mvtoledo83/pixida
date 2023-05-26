import { createContext } from "react";

type SearchInputType = {
  input: any;
};

interface SearchInputInterface {
  searchInput: SearchInputType;
  setSearchInput: (data: any) => void;
}

const searchInputContext = createContext<SearchInputInterface | undefined>(
  undefined
);

export default searchInputContext;
