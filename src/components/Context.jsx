import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { PiCaretUpDownBold } from "react-icons/pi";
// import API from "../data";

let show_page_count = 7;
const Context = () => {
  //   let Data_API = API;
  let { pathname } = useLocation();
  const [volume, setVolume] = useState("1hrs");
  const [data_API, setData_API] = useState([]);
  const [sortType, setSortType] = useState(null);
  const [pageList, setPageList] = useState(0);
  const [total_pages, setTotal_pages] = useState(1);
  let pages = [];

  useEffect(() => {
    let page = pathname.split("/")[1];
    pagination(page);
    page <= pageList
      ? setPageList(pageList - 1)
      : setPageList(
          page < total_pages - 1
            ? page > pageList + show_page_count
              ? pageList + 1
              : pageList
            : pageList
        );
  }, [pathname]);
  for (let index = 0; index < total_pages; index++) {
    pages.push(index);
  }
  useEffect(() => {
    handleSort(sortType);
  }, [sortType]);
  useEffect(() => {
    setData_API(data_API);
  }, [data_API]);
  const pagination = async (page) => {
    fetch(`http://localhost:8080/${page}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((finalResponse) => {
        setTotal_pages(finalResponse.totalPages);
        setData_API(finalResponse.data);
        setSortType(null);
      });
  };
  const handleSort = async (type) => {
    console.log("type: " + type);
    setSortType(type);
    if (type == "asc") {
      // await setData_API([]);
      await data_API.sort(
        (a, b) => +a.data_symbols_count - +b.data_symbols_count
      );
      await setData_API(data_API);
      // console.log(data_API);
    } else if (type == "desc") {
      // await setData_API([]);
      await data_API.sort(
        (a, b) => +b.data_symbols_count - +a.data_symbols_count
      );
      await setData_API(data_API);
      // console.log(data_API);
    } else {
      let page = pathname.split("/")[1];
      pagination(page);
    }
  };
  console.log(data_API);
  return (
    <div className="mt-3 p-3">
      <div className="">
        {/* {location.pathname} */}
        <div className="row my-3 d-flex align-items-center">
          <div className="col-1 text-start fs-5 fw-bold">S.No</div>
          <div className="col-7 text-start fs-5 fw-bold">Exchange Token</div>
          <div className="col-2 text-start fs-5 fw-bold">
            <button
              className="border d-flex align-items-center bg-transparent border-0"
              // onClick={handleSort}
              onClick={() =>
                handleSort(
                  sortType == null ? "asc" : sortType === "asc" ? "desc" : null
                )
              }
            >
              Token{" "}
              {sortType === "asc" ? (
                <AiOutlineUp />
              ) : sortType === "desc" ? (
                <AiOutlineDown />
              ) : (
                <PiCaretUpDownBold />
              )}
              {/* <AiOutlineUp />
              <AiOutlineDown /> */}
              {/* <PiCaretUpDownBold /> */}
            </button>
          </div>
          <div className="col-2 text-start fs-5 fw-bold">
            <select
              className="border border-0 p-0 form-control-plaintext"
              onChange={(e) => setVolume(e.target.value)}
            >
              <option value="1hrs">volume 1hrs</option>
              <option value="1day">volume 24hrs</option>
              <option value="1mth">volume 1mth</option>
            </select>
          </div>
        </div>
        {data_API.length === 0 && <div>Loading</div>}
        {data_API.length !== 0 &&
          data_API.map((token, key) => (
            <div className="row border-bottom border-1 mb-1 pb-1" key={key}>
              <div className="col-1 text-start">
                {(+pathname.split("/")[1] - 1) * 10 + key + 1}
              </div>
              <div className="col-7 text-start">
                <Link
                  className="text-decoration-none fw-bold text-dark"
                  to={token.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  {token.name}
                </Link>
              </div>
              <div className="col-2 text-start">
                $ {token.data_symbols_count}
              </div>
              <div className="col-2 text-start">
                {volume === "1hrs"
                  ? token.volume_1hrs_usd
                  : volume === "1day"
                  ? token.volume_1day_usd
                  : token.volume_1mth_usd}
              </div>
            </div>
          ))}
        <div className="container mt-5 d-flex justify-content-center">
          <nav aria-label="..." className="overflow-auto">
            <ul className="pagination ">
              <li
                className={`page-item ${
                  pathname.split("/")[1] <= 1 ? "disabled" : ""
                }`}
              >
                <Link
                  to={`/${pathname.split("/")[1] - 1}`}
                  className="page-link px-4"
                  // onClick={() => setPage(page - 1)}
                >
                  Previous
                </Link>
              </li>
              {/* {pageList >= show_page_count ? (
                <li className="page-item">
                  <button
                    className="page-link px-4"
                    onClick={() => setPageList(pageList - show_page_count)}
                  >
                    {"<<"}
                  </button>
                </li>
              ) : null} */}
              {pages
                .slice(pageList, pageList + show_page_count)
                .map((count, key) => (
                  <li className="page-item" key={key}>
                    <Link
                      to={`/${count + 1}`}
                      // onClick={() => setPage(count + 1)}
                      className={`page-link px-4 ${
                        pathname.split("/")[1] == count + 1 ? "active" : ""
                      }`}
                    >
                      {count + 1}
                    </Link>
                  </li>
                ))}
              {pathname.split("/")[1] >= pages.length - 1 ? (
                <li className="page-item">
                  <Link
                    to={`/${pages.length - 1}`}
                    // onClick={() => setPage(count + 1)}
                    className={`page-link px-4 ${
                      pathname.split("/")[1] == pages.length - 1 ? "active" : ""
                    }`}
                  >
                    {pages.length - 1}
                  </Link>
                </li>
              ) : (
                <li className="page-item">
                  <div
                    // onClick={() => setPage(count + 1)}
                    className={`page-link px-4 `}
                  >
                    {"..."}
                  </div>
                </li>
              )}
              {pages.slice(pages.length - 1, pages.length).map((count, key) => (
                <li className="page-item" key={key}>
                  <Link
                    to={`/${count + 1}`}
                    // onClick={() => setPage(count + 1)}
                    className={`page-link px-4 ${
                      pathname.split("/")[1] == count + 1 ? "active" : ""
                    }`}
                  >
                    {count + 1}
                  </Link>
                </li>
              ))}
              {/* {pageList < pages.length - show_page_count ? (
                <li className="page-item">
                  <button
                    className="page-link  px-4"
                    onClick={() => {
                      setPageList(pageList + show_page_count);
                    }}
                  >
                    {">>"}
                  </button>
                </li>
              ) : null} */}
              <li
                className={`page-item ${
                  pathname.split("/")[1] >= pages.length ? "disabled" : ""
                }`}
              >
                <Link
                  to={`/${+pathname.split("/")[1] + 1}`}
                  className="page-link px-4"
                  // onClick={() => {
                  //   if (page + 1 >= pageList + show_page_count)
                  //     setPageList(pageList + show_page_count);
                  //   setPage(page + 1);
                  // }}
                >
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Context;
