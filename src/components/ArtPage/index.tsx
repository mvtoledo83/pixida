import React, { useEffect, useState } from "react";
import "./styles.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ArtPage = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [dataArt, setDataArt] = useState<any>([]);
  const objectNumber = props.data;

  useEffect(() => {
    const getArtDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.rijksmuseum.nl/api/nl/collection/${objectNumber}?key=2esrTh6M`
        );
        const result = await response.json();
        const artDataDetails = result.artObject;
        console.log("artDataDetails", artDataDetails);
        setDataArt(artDataDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getArtDetails();
  }, [objectNumber]);

  console.log("dataArt", dataArt);

  return (
    <section id="artapi-layout-artpage" className="artapi-layout-artpage">
      {loading && (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <p>
            <Skeleton height={300} count={1} />
          </p>
        </SkeletonTheme>
      )}
      {!loading && (
        <>
          <a
            id="artapi-layout-artpage-link"
            className="artapi-layout-artpage-link"
            href=""
          >
            <div
              id="artapi-layout-artpage-link-icon"
              className="artapi-layout-artpage-link-icon"
            >
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 10L3.707 5.707L8 1.414L6.586 0L0.879002 5.707L6.586 11.414L8 10Z"
                  fill="#E10856"
                />
              </svg>
            </div>
            <p
              id="artapi-layout-artpage-link-p"
              className="artapi-layout-artpage-link-p"
            >
              Back to the List
            </p>
          </a>
          <article
            id="artapi-layout-artpage-article"
            className="artapi-layout-artpage-article"
            style={{ backgroundImage: `url(${dataArt?.webImage?.url})` }}
          >
            <h1
              id="artapi-layout-artpage-article-h1"
              className="artapi-layout-artpage-article-h1"
            >
              {dataArt?.title}
            </h1>
          </article>
          <ul
            id="artapi-layout-artpage-ul"
            className="artapi-layout-artpage-ul"
          >
            <li
              id="artapi-layout-artpage-ul-li"
              className="artapi-layout-artpage-ul-li"
            >
              <h2
                id="artapi-layout-artpage-ul-li-h2"
                className="artapi-layout-artpage-ul-li-h2"
              >
                Title
              </h2>
              <p
                id="artapi-layout-artpage-ul-li-p"
                className="artapi-layout-artpage-ul-li-p"
              >
                {dataArt?.longTitle}
              </p>
            </li>
            <li
              id="artapi-layout-artpage-ul-li"
              className="artapi-layout-artpage-ul-li"
            >
              <h2
                id="artapi-layout-artpage-ul-li-h2"
                className="artapi-layout-artpage-ul-li-h2"
              >
                Artist
              </h2>
              <p
                id="artapi-layout-artpage-ul-li-p"
                className="artapi-layout-artpage-ul-li-p"
              >
                {dataArt?.principalOrFirstMaker}
              </p>
            </li>
            <li
              id="artapi-layout-artpage-ul-li"
              className="artapi-layout-artpage-ul-li"
            >
              <h2
                id="artapi-layout-artpage-ul-li-h2"
                className="artapi-layout-artpage-ul-li-h2"
              >
                Object Type
              </h2>
              <p
                id="artapi-layout-artpage-ul-li-p"
                className="artapi-layout-artpage-ul-li-p"
              >
                {dataArt?.objectTypes}
              </p>
            </li>
            <li
              id="artapi-layout-artpage-ul-li"
              className="artapi-layout-artpage-ul-li"
            >
              <h2
                id="artapi-layout-artpage-ul-li-h2"
                className="artapi-layout-artpage-ul-li-h2"
              >
                Measurements
              </h2>
              <p
                id="artapi-layout-artpage-ul-li-p"
                className="artapi-layout-artpage-ul-li-p"
              >
                {dataArt?.subTitle}
              </p>
            </li>
            <li
              id="artapi-layout-artpage-ul-li"
              className="artapi-layout-artpage-ul-li"
            >
              <h2
                id="artapi-layout-artpage-ul-li-h2"
                className="artapi-layout-artpage-ul-li-h2"
              >
                Description
              </h2>
              <p
                id="artapi-layout-artpage-ul-li-p"
                className="artapi-layout-artpage-ul-li-p"
              >
                {dataArt?.plaqueDescriptionEnglish}
              </p>
            </li>
          </ul>
        </>
      )}
    </section>
  );
};

export default ArtPage;
