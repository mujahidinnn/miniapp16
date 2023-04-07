const Delete = ({ setShowModalDelete, handleDelete }) => {
  return (
    <div className="bg-modal">
      <div className="content-modal">
        <h1>Are you sure to delete id {1}?</h1>
        <div className="wrap-btn">
          <button
            className="btn btn-success"
            onClick={() => setShowModalDelete(false)}
          >
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
