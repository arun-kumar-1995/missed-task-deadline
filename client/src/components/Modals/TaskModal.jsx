import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import "./Model.css";
import { useToast } from "../../contexts/ToastContext";
import { API } from "../../apiWrapper";
import { getUTCTimestamp } from "../../utils/formatDate.utils";
const TaskModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    deadline: "",
    assignedTo: [],
  });

  useEffect(() => {}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const inputData = {
      ...taskData,
      deadline: getUTCTimestamp(taskData.deadline),
    };

    try {
      const response = await API.post(`/task/create`, inputData);

      toast.success(response?.data?.message);
      setTaskData({});
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <button className="close-modal" onClick={onClose}>
          <MdClose />
        </button>

        <div className="modal-container">
          <h2>Assign Task</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter title"
                value={taskData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Enter description"
                value={taskData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Deadline</label>
              <input
                type="date"
                name="deadline"
                placeholder="Provide deadline"
                value={taskData.deadline}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={taskData.status}
                onChange={handleChange}
              >
                <option value="">Select status</option>
                <option value="To-Do">To-Do</option>
                <option value="In-Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
              >
                <option value="">Select priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? "Submitting" : "Create Task"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
