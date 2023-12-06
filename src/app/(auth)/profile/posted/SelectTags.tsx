"use client";

import { Tag } from "@prisma/client";
import { useRouter } from "next/navigation";

interface SelectTagsProps {
  tags: string[];
  page: number;
}

const SelectTags: React.FC<SelectTagsProps> = ({ tags, page }) => {
  const router = useRouter();

  return (
    <select
      multiple={true}
      onChange={(e) => {
        const tags = Array.from(
          e.target.selectedOptions,
          (option) => option.value,
        );
        const stringTags = tags.join(",");
        router.push(`/profile/posted/?page=${page}&tags=${stringTags}`);
      }}
      className="select select-bordered min-h-[8rem] w-full max-w-xs"
    >
      {Object.keys(Tag).map((tag) => (
        <option
          key={tag}
          value={tag}
          selected={tags.includes(tag)}
          className="link-hover link"
        >
          {tag}
        </option>
      ))}
    </select>
  );
};

export default SelectTags;
