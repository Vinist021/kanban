import { useState } from "react";
import DateInput from "../../shared/modal/DateInput";
import Input from "../../shared/modal/Input";
import Modal from "../../shared/modal/Modal";
import SelectBox from "../../shared/modal/SelectBox";

const TaskModal = ({ isOpen: isOpenProp, onClose: onCloseProp }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = isOpenProp !== undefined;
  const isOpen = isControlled ? isOpenProp : internalOpen;
  const onClose = onCloseProp ?? (() => setInternalOpen(false));

  const options = [
    { value: "high", label: "🔴 Alta" },
    { value: "medium", label: "🟡 Média" },
    { value: "low", label: "🟢 Baixa" },
  ];
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} title="Adicionar novo item">
        <div className="space-y-3">
          <Input
            label="Título"
            placeholder="Digite o título da tarefa"
            required
          />
          <Input
            label="Descrição"
            placeholder="Digite o título da tarefa"
            type="textarea"
            required
          />
          <SelectBox
            label="Prioridade"
            placeholder="Selecione uma prioridade"
            options={options}
            required
          />
          <DateInput label="Data de Vencimento" required />
          <Input
            label="Responsáveis"
            placeholder="Digite o título da tarefa"
            required
          />

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded-md cursor-pointer"
              onClick={() => onClose()}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer"
              onClick={() => onClose()}
            >
              Salvar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskModal;
