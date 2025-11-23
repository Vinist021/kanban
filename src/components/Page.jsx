import { useState } from "react";
import BoardColumn from "./boardColumn/BoardColumn";
import TaskViewModal from "./taskViewModal/TaskViewModal";
import SearchInput from "./search/SearchInput";
import TaskModal from "./taskModal/TaskModal";

const Page = () => {
  const [tasks, setTasks] = useState([]);

  const [viewTask, setViewTask] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const [editTask, setEditTask] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleCreate = (payload) => {
    const newTask = { id: Date.now(), ...payload };
    setTasks((s) => [newTask, ...s]);
  };

  const handleView = (task) => {
    setViewTask(task);
    setIsViewOpen(true);
  };

  const handleEditClick = (task) => {
    setEditTask(task);
    setIsEditOpen(true);
  };

  const handleSaveEdit = (payload) => {
    if (!editTask) return;
    const updated = { ...editTask, ...payload };
    setTasks((s) => s.map((t) => (t.id === updated.id ? updated : t)));
    setIsEditOpen(false);
    setEditTask(null);
  };

  const handleDelete = (task) => {
    setTasks((s) => s.filter((t) => t.id !== task.id));
  };

  return (
    <div className="w-[90%] h-[90vh] mx-auto flex flex-col items-center mt-10 gap-6">
      <SearchInput></SearchInput>
      <div className="w-full h-[80%] flex gap-6">
        <BoardColumn
          title="📌 A fazer"
          counter={tasks.length}
          button={true}
          tasks={tasks}
          onCreate={handleCreate}
          onView={handleView}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />

        <BoardColumn title="⚙️ Em Progresso" counter={0} tasks={[]} />
        <BoardColumn title="✅ Concluído" counter={0} tasks={[]} />
      </div>

      <TaskModal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setEditTask(null);
        }}
        initialData={editTask}
        onSave={(payload) => {
          if (editTask) {
            handleSaveEdit({ ...payload, id: editTask.id });
          }
        }}
      />

      <TaskViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        task={viewTask}
      />
    </div>
  );
};

export default Page;
