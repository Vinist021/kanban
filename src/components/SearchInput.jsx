const SearchInput = () => {
  return (
    <div className="w-full bg-white h-[20%] rounded-2xl shadow">
      <h1 className="ps-5 pb-3 mt-3 text-blue-500 text-2xl font-bold">📋 Kanban Board</h1>

      <h3 className="ps-5 pb-3 text-slate-500">
        Gerenciador de Tarefas Inteligente
      </h3>

      <div className="w-full flex justify-center">
        <input
          type="text"
          placeholder="Pesquisar..."
          className="w-full max-w-[90%] px-3 py-2 rounded shadow-sm bg-white"
        />
      </div>
    </div>
  );
};

export default SearchInput;
