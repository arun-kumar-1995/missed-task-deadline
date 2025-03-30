import { MdAdd } from "react-icons/md";
import "./Tasks.css";
import { MdOutlineEdit } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import { FaTasks } from "react-icons/fa";
import { MdFileDownloadDone } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { FaRegBell } from "react-icons/fa6";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TaskModal from "../../../components/Modals/TaskModal";
import EditTaskModal from "../../../components/Modals/EditTaskModal";
import DeleteModal from "../../../components/Modals/DeleteModal";
import userIcon from "../../../assets/dummyUserIcon.png";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { API } from "../../../apiWrapper";
import { useToast } from "../../../contexts/ToastContext";
import {
  formatDate,
  getCurrentUTCTimestamp,
} from "../../../utils/formatDate.utils";

const TaskPage = () => {
  const [isTaskModal, setTaskModal] = useState(false);
  const [isEditModal, setEditModal] = useState(false);
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [isTaskControl, setTaskControl] = useState(false);
  const [status, setStatus] = useState("To-Do");
  const [isLoading, setIsloading] = useState(false);
  const [tasks, setTasks] = useState([]);

  const toast = useToast();

  const handleClose = () => {
    setTaskModal(false);
    setEditModal(false);
    setDeleteModal(false);
    setTaskControl(false);
  };

  const getTasks = async () => {
    setIsloading(true);
    try {
      const response = await API.get(`/task/get-tasks?status=${status}`);
      setTasks(response?.data?.data.tasks);
    } catch (err) {
      toast.error(err?.response?.data?.error?.message);
    } finally {
      setIsloading(false);
    }
  };
  useEffect(() => {
    getTasks();
  }, [status]);
  console.log(tasks);
  console.log(getCurrentUTCTimestamp());
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
          onClick={() => setStatus("To-Do")}
        >
          <div className="section-header">
            <FaTasks size={18} />
            <h3>To do (05)</h3>
          </div>
        </section>
        <section
          className="section-inprogress"
          onClick={() => setStatus("In-Progress")}
        >
          <div className="section-header">
            <GrInProgress size={18} />
            <h3>In Progress (08)</h3>
          </div>
        </section>
        <section
          className="section-todo"
          onClick={() => setStatus("Completed")}
        >
          <div className="section-header">
            <MdFileDownloadDone size={20} />
            <h3>Done </h3>
          </div>
        </section>
      </div>

      {/* Diplay task */}

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="task-container">
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => {
              const deadline = formatDate(task.deadline);

              return (
                <div className="task-card" key={task._id}>
                  <div className="task-header">
                    <h3>{task.title}</h3>
                    <button
                      type="button"
                      className="btn-task-control"
                      onClick={() => setTaskControl(true)}
                    >
                      <MdOutlineMoreHoriz size={20} />
                    </button>
                  </div>
                  <div className="task-card-body">
                    <span className="task-deadline">{deadline}</span>
                    <p>{task.description}</p>
                    <div className="card-info">
                      <div className="task-card-user">
                        <img
                          src={userIcon}
                          alt="User Icon"
                          className="user-profile"
                        />
                        <img
                          src={userIcon}
                          alt="User Icon"
                          className="user-profile"
                        />
                        <img
                          src={userIcon}
                          alt="User Icon"
                          className="user-profile"
                        />
                      </div>
                      <button
                        className={`task-card-priority --priority-${task.priority}`}
                      >
                        {task.priority}
                      </button>
                    </div>
                  </div>

                  {isTaskControl && (
                    <div className="task-controls">
                      <div
                        className="control"
                        onClick={() => setEditModal(true)}
                      >
                        <button className="icon-btn btn-edit">
                          <MdOutlineEdit size={20} />
                        </button>
                        <span>Edit</span>
                      </div>

                      <div
                        className="control delete-task-control"
                        onClick={() => setDeleteModal(true)}
                      >
                        <button className="icon-btn btn-delete">
                          <GoTrash size={18} />
                        </button>
                        <span>Delete</span>
                      </div>
                    </div>
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
        <EditTaskModal isOpen={isEditModal} onClose={handleClose} />
      )}

      {isDeleteModal && (
        <DeleteModal
          onClose={handleClose}
          data={{ id: "123", title: "Fix UI Bug" }}
        />
      )}
    </div>
  );
};

export default TaskPage;
