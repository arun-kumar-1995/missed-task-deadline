import { MdAdd } from "react-icons/md";
import "./Tasks.css";
import { MdOutlineEdit } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import { FaTasks } from "react-icons/fa";
import { MdFileDownloadDone } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { FaRegBell } from "react-icons/fa6";

import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import TaskModal from "../../../components/Modals/TaskModal";
import EditTaskModal from "../../../components/Modals/EditTaskModal";
import DeleteModal from "../../../components/Modals/DeleteModal";
import userIcon from "../../../assets/dummyUserIcon.png";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { API } from "../../../apiWrapper";
import { useToast } from "../../../contexts/ToastContext";
import { formatDate } from "../../../utils/formatDate.utils";
import { useSocket } from "../../../contexts/SocketContext";

const TaskPage = () => {
  const [isTaskModal, setTaskModal] = useState(false);
  const [isEditModal, setEditModal] = useState(false);
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState({
    "To-Do": [],
    "In-Progress": [],
    Completed: [],
  });
  const [newTasksCount, setNewTasksCount] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskControlId, setTaskControlId] = useState(null);
  const { socket, isConnected } = useSocket();
  const toast = useToast();

  const handleClose = () => {
    setTaskModal(false);
    setEditModal(false);
    setDeleteModal(false);
    setTaskControlId(null);
  };

  const handleSelectedTask = (task) => {
    setEditModal(true);
    setSelectedTask(task);
  };

  const handleDeleteTask = (task) => {
    setDeleteModal(true);
    setSelectedTask(task);
  };

  const fetchTasks = useCallback(async () => {
    setStatus("To-Do");
    setIsLoading(true);
    try {
      const response = await API.get(`/task/get-tasks`);
      const allTasks = response?.data?.data?.tasks || [];

      // Categorize tasks based on status
      const categorizedTasks = {
        "To-Do": [],
        "In-Progress": [],
        Completed: [],
      };

      allTasks.forEach((group) => {
        if (categorizedTasks[group.status]) {
          categorizedTasks[group.status] = group.tasks;
        }
      });

      setTasks(categorizedTasks);
    } catch (err) {
      toast.error(err?.response?.data?.error?.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // get the tasks on first mount

    fetchTasks();
    // update the task dynamically using the event emitted
    socket.on("task_created", (data) => {
      setTasks((prevTasks) => {
        return {
          ...prevTasks,
          [data.task.status]: [data.task, ...prevTasks[data.task.status]],
        };
      });

      //add new task count
      setNewTasksCount((prevCounts) => ({
        ...prevCounts,
        [data.task.status]: (prevCounts[data.task.status] || 0) + 1,
      }));
    });

    socket.on("update_unread_counts", (data) => {
      console.log("Unread count------", data);

      setNewTasksCount((prevCounts) => ({
        ...prevCounts,
        ...data,
      }));
    });

    return () => {};
  }, []);

  const TaskControls = ({ onEdit, onDelete }) => (
    <div className="task-controls">
      <div className="control" onClick={onEdit}>
        <button className="icon-btn btn-edit">
          <MdOutlineEdit size={20} />
        </button>
        <span>Edit</span>
      </div>
      <div className="control delete-task-control" onClick={onDelete}>
        <button className="icon-btn btn-delete">
          <GoTrash size={18} />
        </button>
        <span>Delete</span>
      </div>
    </div>
  );

  const handleSectionClick = async (status) => {
    setStatus(status);
    const userId = JSON.parse(localStorage.getItem("user")).replace(/"/g, "");
    await API.post(`/task/reset-unread`, { status, userId });
  };

  console.log(tasks);

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Tasks</h1>
        <div>
          <Link to="/notification" className="btn btn-notify">
            <FaRegBell size={20} />
            <span>02</span>
          </Link>
          <button
            type="button"
            className="btn btn-create"
            onClick={() => setTaskModal(true)}
          >
            <span className="text">New task</span>
            <MdAdd size={20} />
          </button>
        </div>
      </div>

      <div className="task-sections">
        <section
          className="section-todo --active"
          onClick={() => handleSectionClick("To-Do")}
        >
          <div className="section-header">
            <FaTasks size={18} />
            <h3>To do ({tasks["To-Do"].length})</h3>
            {newTasksCount["To-Do"] && newTasksCount["To-Do"] > 0 && (
              <button className="new-task">{newTasksCount["To-Do"]} new</button>
            )}
          </div>
        </section>
        <section
          className="section-inprogress"
          onClick={() => handleSectionClick("In-Progress")}
        >
          <div className="section-header">
            <GrInProgress size={18} />
            <h3>In Progress ({tasks["In-Progress"].length})</h3>
            {newTasksCount["In-Progress"] &&
              newTasksCount["In-Progress"] > 0 && (
                <button className="new-task">
                  {newTasksCount["In-Progress"]} new
                </button>
              )}
          </div>
        </section>
        <section
          className="section-todo"
          onClick={() => handleSectionClick("Completed")}
        >
          <div className="section-header">
            <MdFileDownloadDone size={20} />
            <h3>Done ({tasks["Completed"].length}) </h3>
            {newTasksCount["Completed"] && newTasksCount["Completed"] > 0 && (
              <button className="new-task">
                {newTasksCount["Completed"]} new
              </button>
            )}
          </div>
        </section>
      </div>

      {/* Diplay task */}

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="task-container">
          {tasks[status] && tasks[status].length > 0 ? (
            tasks[status].map((task) => {
              const deadline = formatDate(task.deadline);
              return (
                <div className="task-card" key={task._id}>
                  <div className="task-header">
                    <h3>{task.title}</h3>
                    <button
                      type="button"
                      className="btn-task-control"
                      onClick={() =>
                        setTaskControlId(
                          taskControlId === task._id ? null : task._id
                        )
                      }
                    >
                      <MdOutlineMoreHoriz size={20} />
                    </button>
                  </div>
                  <div className="task-card-body">
                    <span className="task-deadline">{deadline}</span>
                    <p>{task.description}</p>
                    <div className="card-info">
                      <div className="task-card-user">
                        {task.assignedTo.map((user) => (
                          <img
                            src={userIcon}
                            alt="User Icon"
                            className="user-profile"
                            key={user._id}
                          />
                        ))}
                      </div>
                      <button
                        className={`task-card-priority --priority-${task.priority}`}
                      >
                        {task.priority}
                      </button>
                    </div>
                  </div>

                  {taskControlId === task._id && (
                    <TaskControls
                      onEdit={() => handleSelectedTask(task)}
                      onDelete={() => handleDeleteTask(task)}
                    />
                  )}
                </div>
              );
            })
          ) : (
            <div>We don't have any task to display</div>
          )}
        </div>
      )}

      {/*Model stuffs  */}
      {isTaskModal && <TaskModal isOpen={isTaskModal} onClose={handleClose} />}
      {isEditModal && (
        <EditTaskModal onClose={handleClose} task={selectedTask} />
      )}
      {isDeleteModal && (
        <DeleteModal onClose={handleClose} task={selectedTask} />
      )}
    </div>
  );
};

export default TaskPage;
