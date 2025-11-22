const BoardColumn = ({ title = "Column", counter = 0 }) => {
  return (
    <div className="h-full w-[33%] bg-white rounded-xl shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="px-2 w-[30px] py-1 text-xs text-center font-medium bg-blue-400 text-gray-700 rounded-3xl">
          {counter}
        </span>
      </div>
      <hr className="text-gray-400" />
      <div>{/* Column content goes here */}</div>
    </div>
  );
};

export default BoardColumn;
