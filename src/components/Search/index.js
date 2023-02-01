import React from "react";
import Style from "./Search.module.scss";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";
import { useEffect, useState } from "react";
import { getPageContent } from "../../../lib/pages";

const Search = ({ modalClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [count, setCount] = useState(0);

  const [result, setResult] = useState();

  useEffect(() => {
    const getData = async () => {
      if (searchTerm) {
        const data = await getPageContent(`search?q=${searchTerm}`);
        setResult(data?.data?.widgets?.tabs);
        setCount(data?.data?.widgets?.total_posts)
      }
    };
    getData();
  }, [searchTerm]);



  return (
    <section className={Style.search_sec}>
      <SearchInput
        setSearchTerm={setSearchTerm}
        handleModal={modalClose}
        searchTerm={searchTerm}
      />
      <SearchResult
        result={result}
        handleModal={modalClose}
        searchTerm={searchTerm}
        count={count}
      />
    </section>
  );
};

export default Search;
