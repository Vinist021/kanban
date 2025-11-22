import BoardColumn from "./BoardColumn";
import SearchInput from "./SearchInput";

const Container = () => {
  return (
    <div className="w-[90%] h-[90vh] mx-auto flex flex-col items-center mt-10 gap-6">
      <SearchInput></SearchInput>
      <div className="w-full h-[80%] flex gap-6">
        <BoardColumn></BoardColumn>
        <BoardColumn></BoardColumn>
        <BoardColumn></BoardColumn>
      </div>
    </div>
  );
};

export default Container;
