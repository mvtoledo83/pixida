import React, { useContext, useEffect, useState } from "react";
import "./styles.scss";
import ArtPage from "../ArtPage";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import searchContext from "../../context/searchContext";
import searchCountContext from "../../context/searchCountContext";
import searchInputContext from "../../context/searchInputContext";

const Main = () => {
  const [data, setData] = useState([]);
  const [openPage, setOpenPage] = useState(false);
  const [artItem, setArtItem] = useState("");
  const [loading, setLoading] = useState(false);
  const { searchResult } = useContext(searchContext);
  const { countResult } = useContext(searchCountContext);
  const { searchInput } = useContext(searchInputContext);

  useEffect(() => {
    const getArtApi = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.rijksmuseum.nl/api/nl/collection?key=2esrTh6M`
        );
        const result = await response.json();
        const artData = result.artObjects;
        setData(artData);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getArtApi();
  }, []);

  const openArtPage = (objectNumber: any) => {
    setOpenPage(true);
    setArtItem(objectNumber);
  };

  const sliceInputResult = JSON.stringify(searchInput).slice(3, -3);

  return (
    <>
      {openPage ? (
        <ArtPage data={artItem} />
      ) : (
        <main id="artapi-layout-main" className="artapi-layout-main">
          <h1 id="artapi-layout-main-h1" className="artapi-layout-main-h1">
            {!countResult
              ? "All artwork"
              : `Found ${JSON.stringify(
                  countResult
                )} results for: ${sliceInputResult}`}
          </h1>
          {loading ? (
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <p>
                <Skeleton height={300} count={1} />
              </p>
            </SkeletonTheme>
          ) : (
            <ul id="artapi-layout-main-ul" className="artapi-layout-main-ul">
              {data.map((artItems) => (
                <li
                  id="artapi-layout-main-ul-li"
                  className="artapi-layout-main-ul-li"
                  key={artItems.id}
                >
                  <article
                    id="artapi-layout-main-ul-li-article"
                    className="artapi-layout-main-ul-li-article"
                    style={{ backgroundImage: `url(${artItems.webImage.url})` }}
                    onClick={() => openArtPage(artItems.objectNumber)}
                  >
                    <small
                      id="artapi-layout-main-ul-li-article-small"
                      className="artapi-layout-main-ul-li-article-small"
                    >
                      {artItems.principalOrFirstMaker}
                    </small>
                    <h2
                      id="artapi-layout-main-ul-li-article-h2"
                      className="artapi-layout-main-ul-li-article-h2"
                    >
                      {artItems.longTitle}
                    </h2>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </main>
      )}
    </>
  );
};

export default Main;
