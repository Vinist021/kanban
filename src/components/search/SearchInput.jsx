const SearchInput = () => {
  return (
    <div className="w-full bg-white h-[22%] min-h-[150px] rounded-2xl shadow">
      <h1 className="ps-5 pb-3 mt-3 text-blue-500 text-2xl font-bold">
        📋 Kanban Board
      </h1>

      <h3 className="ps-5 pb-3 text-slate-500">
        Gerenciador de Tarefas Inteligente
      </h3>

      <div className="w-full flex justify-center w-[90%]">
        <input
          type="text"
          placeholder="Pesquisar..."
          className="w-full max-w-[90%] px-3 py-2 rounded shadow-sm bg-white"
        />
        <button
          type="button"
          aria-label="Adicionar"
          className="bg-gray-200 hover:bg-gray-300 w-12 h-12 aspect-square flex items-center justify-center rounded ml-2 cursor-pointer"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
