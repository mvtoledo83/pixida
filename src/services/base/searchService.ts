import React from "react";
import axios from "axios";

export const searchService = (text: string) => {
  axios.get(
    `https://www.rijksmuseum.nl/api/nl/collection?key=2esrTh6M&involvedMaker=&{text}`
  );
};
