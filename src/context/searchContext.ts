import { createContext } from "react";
type SearchResponse = {
  artObjects: [
    hasImage: boolean,
    headerImage: [],
    id: string,
    longTitle: string,
    objectNumber: string,
    principalOrFirstMaker: string,
    productionPlaces: [],
    title: string,
    webImage: [url: string]
  ];
};

interface SearchContextInterface {
  searchResult: SearchResponse[];
  setSearchResult: (data: SearchResponse[]) => void;
}

const searchContext = createContext<SearchContextInterface | undefined>(undefined);

export default searchContext;
