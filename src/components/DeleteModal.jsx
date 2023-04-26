const DeleteModal = ({ handleClose, handleDelete, nameItem,loadingText }) => {
  return (
    <div className="bg-modal">
      <div className="content-modal">
        <h1>Anda yakin ingin menghapus {nameItem} ?</h1>
        <div className="wrap-btn">
          <button className="btn btn-success" onClick={handleClose}>
            Batal
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            {loadingText ? "Menghapus.." : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
