import { createContext } from "react";

interface ApiResponse {
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

interface ApiContextType {
  searchResult: ApiResponse[];
  setSearchResult: (data: ApiResponse[]) => void;
};

const searchContext = createContext<ApiContextType | undefined>(undefined);

export default searchContext;
