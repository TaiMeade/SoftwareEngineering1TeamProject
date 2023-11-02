"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";

interface SearchBarProps {
  initialSearch?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ initialSearch }) => {
  const [search, setSearch] = useState(initialSearch || "");
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const searchInput = searchRef?.current;
    if (!search || !searchInput) return;

    if (search.length === 0) {
      searchInput.blur();
    }

    if (search.length === 0) {
      searchInput.focus();
    } else {
      router.push(`/search?q=${search}`);
    }
  }, [router, search]);

  return (
    <div className="flex flex-row items-center justify-center ">
      <input
        type="text"
        ref={searchRef}
        placeholder="Search for a recipe..."
        defaultValue={initialSearch}
        onChange={(e) => setSearch(e.target.value)}
        // className="form-input hidden rounded-md rounded-r-none placeholder:text-sm md:block"
        className="input input-bordered hidden w-full rounded-md rounded-r-none placeholder:text-sm md:block"
      />
      <button
        onClick={() => router.push(`/search?q=${search}`)}
        className="btn btn-accent flex flex-row items-center justify-center gap-2 rounded-l-none"
      >
        <BsSearch className="text-sm" />
        <span>Search</span>
      </button>
    </div>
  );
};

export default SearchBar;
