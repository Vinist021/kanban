import { useState } from "react";
import Modal from "./modal/Modal";
import ModalInput from "./modal/ModalInput";
import SelectBox from "./modal/SelectBox";
import DateInput from "./modal/DateInput";

const BoardColumn = ({ title = "Column", counter = 0, button = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [ 
    {value: "high", label: "🔴 Alta"},
    {value: "medium", label: "🟡 Média"},
    {value: "low", label: "🟢 Baixa"},
   ];

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
            onClick={() => setIsOpen(true)}
          >
            + Adicionar
          </button>

          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Adicionar novo item"
          >
            <div className="space-y-3">

              <ModalInput label="Título" placeholder="Digite o título da tarefa" required />
              <ModalInput label="Descrição" placeholder="Digite o título da tarefa" type="textarea" required/>
              <SelectBox label="Prioridade" placeholder="Selecione uma prioridade" options={options} required/>
              <DateInput label="Data de Vencimento" required/>
              <ModalInput label="Responsáveis" placeholder="Digite o título da tarefa" required />


              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded-md cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer"
                >
                  Salvar
                </button>
              </div>
            </div>
          </Modal>
        </div>
      )}

      <div className="flex-1 bg-gray-200 mt-3 rounded-xl">
        {/* Column content goes here */}
      </div>
    </div>
  );
};

export default BoardColumn;
