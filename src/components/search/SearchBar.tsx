"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";

interface SearchBarProps {
  initialSearch?: string;
  field?: ISearchFields;
}

const CATEGORIES: ISearchFields[] = ["title", "desc", "tags", "author"];

const SearchBar: React.FC<SearchBarProps> = ({ initialSearch, field }) => {
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState(initialSearch || "");
  const [category, setCategory] = useState<ISearchFields>(field || "title");

  useEffect(() => {
    const searchInput = searchRef?.current;
    if (!search || !searchInput) return;

    if (search.length === 0) {
      searchInput.blur();
    }

    if (search.length === 0) {
      searchInput.focus();
    } else {
      router.push(`/search?q=${search}&c=${category}`);
    }
  }, [router, search, category]);

  return (
    <div className="flex flex-row items-center justify-center ">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as ISearchFields)}
        className="btn btn-square btn-accent flex w-fit flex-row items-center justify-center rounded-r-none"
      >
        {CATEGORIES.map((cat) => (
          <option
            key={cat}
            value={cat}
            onClick={() => router.push(`/search?q=${search}&c=${category}`)}
          >
            {(cat[0]?.toUpperCase() ?? "") + cat.slice(1)}
          </option>
        ))}
      </select>

      <input
        type="text"
        ref={searchRef}
        placeholder="Search for a recipe..."
        defaultValue={initialSearch}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered hidden w-full rounded-none placeholder:text-sm md:block"
      />
      <button
        onClick={() => router.push(`/search?q=${search}&c=${category}`)}
        className="btn btn-accent flex flex-row items-center justify-center gap-2 rounded-l-none"
      >
        <BsSearch className="text-sm" />
        <span>Search</span>
      </button>
    </div>
  );
};

export default SearchBar;
