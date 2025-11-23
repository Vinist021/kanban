import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DateInput from "../../shared/modal/DateInput";
import Input from "../../shared/modal/Input";
import Modal from "../../shared/modal/Modal";
import SelectBox from "../../shared/modal/SelectBox";

const TaskModal = ({
  isOpen: isOpenProp,
  onClose: onCloseProp,
  onSave,
  initialData = null,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = isOpenProp !== undefined;
  const isOpen = isControlled ? isOpenProp : internalOpen;
  const onClose = onCloseProp ?? (() => setInternalOpen(false));

  const options = [
    { value: "alta", label: "🔴 Alta" },
    { value: "média", label: "🟡 Média" },
    { value: "baixa", label: "🟢 Baixa" },
  ];

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      priority: "",
      dueDate: "",
      assignees: "",
    },
  });

  useEffect(() => {
    if (!isOpen) return;
    if (initialData) {
      const assignees = Array.isArray(initialData.assignees)
        ? initialData.assignees.join(", ")
        : initialData.assignees || "";

      reset({
        title: initialData.title || "",
        description: initialData.description || "",
        priority: initialData.priority || "",
        dueDate: initialData.dueDate || "",
        assignees,
      });
    } else {
      reset();
    }
  }, [isOpen, initialData, reset]);

  const validateDisplayDate = (display) => {
    if (!display) return false;
    const digits = (display || "").replace(/\D/g, "");
    if (digits.length !== 8) return false;
    const d = parseInt(digits.slice(0, 2), 10);
    const m = parseInt(digits.slice(2, 4), 10);
    const y = parseInt(digits.slice(4, 8), 10);
    const date = new Date(y, m - 1, d);
    return (
      date.getFullYear() === y &&
      date.getMonth() === m - 1 &&
      date.getDate() === d
    );
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
      assignees: data.assignees
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    if (typeof onSave === "function") onSave(payload);
    onClose();
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      title="Adicionar novo item"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Título é obrigatório" }}
            render={({ field }) => (
              <Input
                label="Título"
                placeholder="Digite o título da tarefa"
                required
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.title ? (
            <p className="text-xs text-red-600">{errors.title.message}</p>
          ) : null}
        </div>

        <div>
          <Controller
            name="description"
            control={control}
            rules={{}}
            render={({ field }) => (
              <Input
                label="Descrição"
                placeholder="Digite o descrição da tarefa"
                type="textarea"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="priority"
            control={control}
            rules={{ required: "Selecione uma prioridade" }}
            render={({ field }) => (
              <SelectBox
                label="Prioridade"
                placeholder="Selecione uma prioridade"
                options={options}
                required
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.priority ? (
            <p className="text-xs text-red-600">{errors.priority.message}</p>
          ) : null}
        </div>

        <div>
          <Controller
            name="dueDate"
            control={control}
            rules={{
              required: "Data de vencimento é obrigatória",
              validate: (v) =>
                validateDisplayDate(v) || "Data inválida (dd/mm/aaaa)",
            }}
            render={({ field }) => (
              <DateInput
                label="Data de Vencimento"
                required
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.dueDate ? (
            <p className="text-xs text-red-600">{errors.dueDate.message}</p>
          ) : null}
        </div>

        <div>
          <Controller
            name="assignees"
            control={control}
            rules={{ required: "Informe ao menos um responsável" }}
            render={({ field }) => (
              <Input
                label="Responsáveis"
                placeholder="Digite os nomes dos responsáveis separados por vírgula (Ex.: João, Maria)"
                required
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.assignees ? (
            <p className="text-xs text-red-600">{errors.assignees.message}</p>
          ) : null}
        </div>

        <div className="flex gap-2 justify-end">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 rounded-md cursor-pointer"
            onClick={() => {
              reset();
              onClose();
            }}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer"
            onClick={() => handleSubmit(onSubmit)()}
          >
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;
