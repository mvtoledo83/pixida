import { createContext } from "react";

type searchLoadingType = {
  loading: boolean;
};

interface searchLoadingInterface {
  searchLoading: searchLoadingType;
  setSearchLoading: (data: boolean) => void;
}

const searchLoadingContext = createContext<searchLoadingInterface | undefined>(
  undefined
);

export default searchLoadingContext;
