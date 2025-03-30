import { useState } from "react";
import { MdClose } from "react-icons/md";
import "./Model.css";
import { API } from "../../apiWrapper";
import { useToast } from "../../contexts/ToastContext";

const DeleteModal = ({ onClose, task }) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await API.delete(`/task/delete-task/${task._id}`);
      console.log(response);
      toast.success(response?.data?.message);
      setInputValue("");
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

        <div className="modal-container delete-modal-container">
          <h2>Delete Task</h2>
          <p>
            Type <strong>{task?.title}</strong> to confirm deletion:
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter task title"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
              autoComplete="on"
            />

            <div className="btn-group">
              <button
                className="btn btn-cancel"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className={`btn btn-delete${
                  inputValue === task?.title ? " --active" : ""
                }`}
                type="submit"
                disabled={inputValue !== task?.title}
              >
                {isLoading ? "Processing..." : "Delete"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
