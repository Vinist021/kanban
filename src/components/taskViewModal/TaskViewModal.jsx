import Modal from "../../shared/modal/Modal";

const TaskViewModal = ({ isOpen, onClose, task }) => {
  if (!task) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ver tarefa">
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>

        <div className="text-sm">
          <strong>Prioridade:</strong> {task.priority}
        </div>

        <div className="text-sm">
          <strong>Vencimento:</strong> {task.dueDate}
        </div>

        <div className="text-sm">
          <strong>Responsáveis:</strong> {(task.assignees || []).join(", ")}
        </div>

        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md cursor-pointer"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskViewModal;
