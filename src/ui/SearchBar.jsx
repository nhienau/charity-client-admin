import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { HiOutlineMagnifyingGlass, HiOutlineXMark } from "react-icons/hi2";

function SearchBar({
  queryParamKey,
  pageParamKey,
  inputPlaceholder,
  loading,
  className,
}) {
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef();

  useEffect(
    function () {
      const query = searchParams.get(queryParamKey);
      if (query) {
        setQuery(query);
      }
    },
    [searchParams, queryParamKey],
  );

  function handleClear() {
    setQuery("");
    inputRef.current.focus();
    searchParams.set(queryParamKey, "");
    searchParams.set(pageParamKey, 1);
    setSearchParams(searchParams);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim() === "") return;
    searchParams.set(queryParamKey, query);
    searchParams.set(pageParamKey, 1);
    setSearchParams(searchParams);
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="has-[:focus]:outline-solid flex w-full items-center justify-between gap-2 rounded-md border-[1px] border-solid border-slate-400 px-3 py-2 has-[:focus]:outline has-[:focus]:outline-[1px] has-[:focus]:outline-slate-900">
        <HiOutlineMagnifyingGlass className="h-5 w-5 flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
          className="w-full bg-inherit text-slate-900 focus:outline-none"
          ref={inputRef}
          placeholder={inputPlaceholder}
        />
        {query !== "" && (
          <button
            type="button"
            className="flex items-center justify-center"
            onClick={handleClear}
          >
            <HiOutlineXMark className="h-5 w-5 flex-shrink-0" />
          </button>
        )}
      </div>
    </form>
  );
}

export default SearchBar;
