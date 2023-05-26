import { createContext } from "react";

type CountType = {
  count: number;
};

interface SearchCountInterface {
  countResult: CountType;
  setCountResult: (data: CountType) => void;
}

const searchCountContext = createContext<SearchCountInterface | null>(null);

export default searchCountContext;
