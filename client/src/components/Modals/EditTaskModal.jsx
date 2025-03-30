import { useState } from "react";
import { MdClose } from "react-icons/md";
import "./Model.css";
import { getUTCTimestamp } from "../../utils/formatDate.utils";
import { API } from "../../apiWrapper";
import { useToast } from "../../contexts/ToastContext";

const EditTaskModal = ({ onClose, task }) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "pending",
    priority: task?.priority || "medium",
    deadline: task?.deadline
      ? new Date(task.deadline).toISOString().slice(0, 10)
      : "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    const inputData = {
      ...formData,
      deadline: getUTCTimestamp(formData.deadline),
    };

    console.log(inputData);
    try {
      const response = await API.put(
        `/task/update-task/${task._id}`,
        inputData
      );
      console.log(response);
      toast.success(response?.data?.message);
      setFormData({});
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <button className="close-modal" onClick={onClose}>
          <MdClose />
        </button>

        <div className="modal-container">
          <h2>Edit Task</h2>
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title"
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter task description"
                required
              />
            </div>

            {/* Status */}
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Priority */}
            <div className="form-group">
              <label>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Deadline */}
            <div className="form-group">
              <label>Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
