import { useState } from "react";

import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description:
      "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
    tags: ["web", "react", "js"],
    priority: "high",
    isFavorite: false,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleAddOrEditTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }

    setShowAddModal(false);
  }

  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowAddModal(true);
  }

  function handleCloseClick() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }

  function handleDeleteTask(taskId) {
    const taskAfterDelete = tasks.filter((task) => task.id !== taskId);
    setTasks(taskAfterDelete);
  }

  function handleAllDeleteTask() {
    tasks.length = 0;
    setTasks([...tasks]);
  }

  function handleFavoriteTask(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTask = [...tasks];
    newTask[taskIndex].isFavorite = !newTask[taskIndex].isFavorite;
    setTasks(newTask);
  }

  function handleSearchTask(searchTerm) {
    const findSearchTerm = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTasks([...findSearchTerm]);
  }
  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddOrEditTask}
          taskToUpdate={taskToUpdate}
          onCloseClick={handleCloseClick}
        />
      )}
      <div className="container">
        {/* <!-- Search Box --> */}
        <SearchTask onSearch={handleSearchTask} />
        {/* <!-- Search Box Ends --> */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onAddClick={() => setShowAddModal(true)}
            onAllDeleteClick={handleAllDeleteTask}
          />
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onFavorite={handleFavoriteTask}
            />
          ) : (
            <NoTaskFound />
          )}
        </div>
      </div>
    </section>
  );
}