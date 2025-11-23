import { useState } from "react";
import BoardColumn from "./boardColumn/BoardColumn";
import SearchInput from "./search/SearchInput";
import TaskModal from "./taskModal/TaskModal";
import TaskViewModal from "./taskViewModal/TaskViewModal";

const Page = () => {
  const [tasks, setTasks] = useState([]);

  const [viewTask, setViewTask] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const [editTask, setEditTask] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleCreateWithStatus = (payload, status = "todo") => {
    const newTask = { id: Date.now(), status, ...payload };
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

  const handleDragStart = (e, task) => {
    try {
      e.dataTransfer.setData("text/plain", String(task.id));
      e.dataTransfer.effectAllowed = "move";
    } catch {
      console.log("Erro ao arrastar")
    }
  };

  const handleMove = (taskId, toStatus) => {
    setTasks((s) =>
      s.map((t) => (t.id === taskId ? { ...t, status: toStatus } : t))
    );
  };

  return (
    <div className="w-[90%] h-[90vh] mx-auto flex flex-col items-center mt-10 gap-6">
      <SearchInput></SearchInput>
      <div className="w-full h-[80%] flex gap-6">
        <BoardColumn
          title="📌 A fazer"
          counter={tasks.filter((t) => (t.status || "todo") === "todo").length}
          button={true}
          tasks={tasks}
          status="todo"
          onCreate={handleCreateWithStatus}
          onView={handleView}
          onEdit={handleEditClick}
          onDelete={handleDelete}
          onMove={handleMove}
          onDragStart={handleDragStart}
        />

        <BoardColumn
          title="⚙️ Em Progresso"
          counter={
            tasks.filter((t) => (t.status || "todo") === "inprogress").length
          }
          tasks={tasks}
          status="inprogress"
          onView={handleView}
          onEdit={handleEditClick}
          onDelete={handleDelete}
          onMove={handleMove}
          onDragStart={handleDragStart}
        />

        <BoardColumn
          title="✅ Concluído"
          counter={tasks.filter((t) => (t.status || "todo") === "done").length}
          tasks={tasks}
          status="done"
          onView={handleView}
          onEdit={handleEditClick}
          onDelete={handleDelete}
          onMove={handleMove}
          onDragStart={handleDragStart}
        />
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
