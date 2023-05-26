import { createContext } from "react";

type ApiResponse = {
  artObjects: [
    hasImage: Boolean,
    headerImage: [],
    id: string,
    longTitle: string,
    objectNumber: string,
    principalOrFirstMaker: string,
    productionPlaces: [],
    title: string,
    webImage: [url: string]
  ];
  count: number;
};

type ApiContextType = {
  searchResult: ApiResponse[];
  setSearchResult: (data: ApiResponse[]) => void;
};

const searchContext = createContext<ApiContextType | undefined>(undefined);

export default searchContext;
