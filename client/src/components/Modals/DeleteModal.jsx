import { useState } from "react";
import { MdClose } from "react-icons/md";
import "./Model.css";

const DeleteModal = ({ onClose, data, onDelete }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onDelete(data?.id);
    onClose();
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
            Type <strong>{data?.title}</strong> to confirm deletion:
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter task title"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
            />

            <div className="btn-group">
              <button className="btn btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn btn-delete"
                type="submit"
                disabled={inputValue !== data?.title}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
