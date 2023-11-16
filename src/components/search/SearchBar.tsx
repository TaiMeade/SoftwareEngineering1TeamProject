"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";

interface SearchBarProps {
  initialSearch?: string;
  field?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ initialSearch, field }) => {
  const [search, setSearch] = useState(initialSearch || "");
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [value, setValue] = React.useState(field || "title");

  useEffect(() => {
    const searchInput = searchRef?.current;
    if (!search || !searchInput) return;

    if (search.length === 0) {
      searchInput.blur();
    }

    if (search.length === 0) {
      searchInput.focus();
    } else {
      router.push(`/search?q=${search}&c=${value}`);
    }
  }, [router, search, value]);

  return (
    <div className="flex flex-row items-center justify-center ">
      {/*
      <select className="btn btn-accent flex flex-row items-center justify-center gap-2 rounded-l-none">
        <option value="title">Title</option>
        <option value="description">Description</option>
        <option value="tags">Tags</option>
        <option value="author">Author</option>
  </select>*/}


    <select
        onClick={() => router.push(`/search?q=${search}&c=${value}`)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        //className="w-"
        className="btn-square btn-accent flex w-fit flex-row items-center justify-center gap-2 rounded-r-none"
      >
        <option
          onClick={() => router.push(`/search?q=${search}&c=${value}`)}
          value="title"
        >
          Title
        </option>
        <option
          onClick={() => router.push(`/search?q=${search}&c=${value}`)}
          value="desc"
        >
          Description
        </option>
        <option
          onClick={() => router.push(`/search?q=${search}&c=${value}`)}
          value="tags"
        >
          Tags
        </option>
        <option
          onClick={() => router.push(`/search?q=${search}&c=${value}`)}
          value="author"
        >
          Author
        </option>
      </select>


      <input
        type="text"
        ref={searchRef}
        placeholder="Search for a recipe..."
        defaultValue={initialSearch}
        onChange={(e) => setSearch(e.target.value)}
        // className="form-input hidden rounded-md rounded-r-none placeholder:text-sm md:block"
        className="input input-bordered hidden w-full rounded-none placeholder:text-sm md:block"
      />
      <button
        onClick={() => router.push(`/search?q=${search}&c=${value}`)}
        className="btn btn-accent flex flex-row items-center justify-center gap-2 rounded-l-none"
      >
        <BsSearch className="text-sm" />
        <span>Search</span>
      </button>
    </div>
  );
};

export default SearchBar;
