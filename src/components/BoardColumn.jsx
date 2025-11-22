const BoardColumn = ({ title = "Column", counter = 0, button = false }) => {
  return (
    <div className="h-full w-[33%] bg-white rounded-xl shadow p-4 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="px-2 w-[30px] py-1 text-xs text-center font-medium bg-blue-400 text-gray-700 rounded-3xl">
          {counter}
        </span>
      </div>
      <hr className="text-gray-400" />

      {button && (
        <div className="mt-3">
          <button
            type="button"
            className="w-full h-[45px] bg-green-500 text-white px-3 py-2 rounded-xl shadow-sm cursor-pointer"
          >
            + Adicionar
          </button>
        </div>
      )}

      <div className="flex-1">{/* Column content goes here */}</div>
    </div>
  );
};

export default BoardColumn;
