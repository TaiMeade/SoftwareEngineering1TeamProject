interface TagProps {
  tag: string;
}

const Tag: React.FC<TagProps> = ({ tag }) => {
  return (
    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-600">
      {tag}
    </span>
  );
};

export default Tag;
