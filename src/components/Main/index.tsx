import React, { useContext, useEffect, useState } from "react";
import "./styles.scss";
import ArtPage from "../ArtPage";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import searchContext from "../../context/searchContext";
import searchCountContext from "../../context/searchCountContext";
import searchInputContext from "../../context/searchInputContext";
import searchLoadingContext from "../../context/searchLoadingContext";
import ReactPaginate from "react-paginate";

export const SkeletonLoading = () => {
  return (
    <>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <p>
          <Skeleton height={300} count={1} />
        </p>
      </SkeletonTheme>
    </>
  );
};

const Main = () => {
  const [data, setData] = useState([]);
  const [openPage, setOpenPage] = useState(false);
  const [artItem, setArtItem] = useState("");
  const [loading, setLoading] = useState(false);
  const { searchResult } = useContext(searchContext);
  const { countResult } = useContext(searchCountContext);
  const { searchInput } = useContext(searchInputContext);
  const { searchLoading } = useContext(searchLoadingContext);

  useEffect(() => {
    const getArtApi = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.rijksmuseum.nl/api/nl/collection?key=2esrTh6M&p=1&ps=12`
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

  const sliceInputResult = JSON.stringify(searchInput).slice(1, -1);

  return (
    <>
      {openPage ? (
        <ArtPage data={artItem} />
      ) : (
        <main id="artapi-layout-main" className="artapi-layout-main">
          {searchLoading ? (
            <SkeletonLoading />
          ) : (
            <>
              <h1 id="artapi-layout-main-h1" className="artapi-layout-main-h1">
                {!countResult
                  ? "All artwork"
                  : `Found ${JSON.stringify(
                      countResult
                    )} results for: ${sliceInputResult}`}
              </h1>
              {loading ? (
                <SkeletonLoading />
              ) : (
                <>
                  <ul
                    id="artapi-layout-main-ul"
                    className="artapi-layout-main-ul"
                  >
                    {data.map((artItems) => (
                      <li
                        id="artapi-layout-main-ul-li"
                        className="artapi-layout-main-ul-li"
                        key={artItems.id}
                      >
                        <article
                          id="artapi-layout-main-ul-li-article"
                          className="artapi-layout-main-ul-li-article"
                          style={{
                            backgroundImage: `url(${artItems.webImage.url})`,
                          }}
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

                  <div
                    id="artapi-layout-main-ul-pagination"
                    className="artapi-layout-main-ul-pagination"
                  >
                    <ReactPaginate
                      previousLabel={"<"}
                      nextLabel={">"}
                      pageCount={10} 
                      marginPagesDisplayed={2} 
                      pageRangeDisplayed={1}
                      //onPageChange={handlePageChange} // Função chamada quando a página é alterada
                      containerClassName={"pagination"}
                      breakLinkClassName="page-link"
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      activeClassName="active"
                    />
                  </div>
                </>
              )}
            </>
          )}
        </main>
      )}
    </>
  );
};

export default Main;
