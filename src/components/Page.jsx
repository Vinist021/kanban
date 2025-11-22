import BoardColumn from "./boardColumn/BoardColumn";
import SearchInput from "./search/SearchInput";

const Page = () => {
  return (
    <div className="w-[90%] h-[90vh] mx-auto flex flex-col items-center mt-10 gap-6">
      <SearchInput></SearchInput>
      <div className="w-full h-[80%] flex gap-6">
        <BoardColumn title="📌 A fazer" counter={4} button={true} />
        <BoardColumn title="⚙️ Em Progresso" counter={2} />
        <BoardColumn title="✅ Concluído" counter={0} />
      </div>
    </div>
  );
};

export default Page;
