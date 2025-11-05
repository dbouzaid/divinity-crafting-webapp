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
        type="text"
        className="p-2 mb-4 border dark:border-gray-700 dark:bg-gray-800 dark:text-white border-slate-400 bg-slate-200 text-black w-full"
        value={filterQuery}
        onChange={(e) => setFilterQuery(e.target.value)}
        placeholder="Filter..."
      />
    </div>
  );
}
