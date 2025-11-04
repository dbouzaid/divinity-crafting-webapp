type FilterQueryBoxProps = {
  setFilterQuery: (value: string) => void;
  filterQuery: string;
};

export default function FilterQueryBox({
  filterQuery,
  setFilterQuery,
}: FilterQueryBoxProps) {
  return (
    <div>
      <input
        type="text"        className="p-2 mb-4 border border-gray-700 bg-gray-800 text-white w-full"

        value={filterQuery}
        onChange={(e) => setFilterQuery(e.target.value)}
        placeholder="Filter..."
      />
    </div>
  );
}
