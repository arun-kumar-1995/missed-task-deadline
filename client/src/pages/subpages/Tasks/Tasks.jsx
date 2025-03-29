import { MdAdd } from "react-icons/md";
import "./Tasks.css";
import { MdOutlineEdit } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import { FaTasks } from "react-icons/fa";
import { MdFileDownloadDone } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { FaRegBell } from "react-icons/fa6";

import { Link } from "react-router-dom";
import { useState } from "react";
import TaskModal from "../../../components/TaskModal";
import EditTaskModal from "../../../components/EditTaskModal";

const TaskPage = () => {
  const [isTaskModal, setTaskModal] = useState(false);
  const [isEditModal, setEditModal] = useState(false);
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

      <div className="task-wrapper">
        <section className="section-todo">
          <div className="section-header">
            <FaTasks size={20} />
            <h3>To do (05)</h3>
          </div>
          <div className="task-container">
            <div className="task clr-todo">
              <div className="task-header">
                <h3>Optimize user controller</h3>
                <div className="task-controls">
                  <button
                    className="icon-btn btn-edit"
                    onClick={() => setEditModal(true)}
                  >
                    <MdOutlineEdit size={20} />
                  </button>
                  <button className="icon-btn btn-delete">
                    <GoTrash size={18} />
                  </button>
                </div>
              </div>
              <div className="task-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisci elit, sed
                  eiusmod tempor incidunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
            <div className="task">
              <div className="task-header">
                <h3>Optimize user controller</h3>
                <div className="task-controls">
                  <button
                    className="icon-btn btn-edit"
                    onClick={() => setEditModal(true)}
                  >
                    <MdOutlineEdit size={20} />
                  </button>
                  <button className="icon-btn btn-delete">
                    <GoTrash size={18} />
                  </button>
                </div>
              </div>
              <div className="task-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisci elit, sed
                  eiusmod tempor incidunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="section-inprogress">
          <div className="section-header">
            <GrInProgress size={20} />
            <h3>In Progress (08)</h3>
          </div>
        </section>
        <section className="section-todo">
          <div className="section-header">
            <MdFileDownloadDone size={24} />
            <h3>Done </h3>
          </div>
        </section>
      </div>

      {isTaskModal && (
        <TaskModal isOpen={isTaskModal} onClose={() => setTaskModal(false)} />
      )}

      {isEditModal && (
        <EditTaskModal
          isOpen={isEditModal}
          onClose={() => setEditModal(false)}
        />
      )}
    </div>
  );
};

export default TaskPage;
