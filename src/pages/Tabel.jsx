import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import { request } from "../utils/request";

const Tabel = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkUserToken = () => {
      const userToken = localStorage.getItem("token");
      if (!userToken || userToken === "undefined") {
        return navigate("/");
      }
    };
    checkUserToken();
  }, []);
  function getData() {
    setLoading(true);
    request
      .get("/index")
      .then((response) => {
        setLoading(false);
        setData(response.data.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  // delete
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  const [itemDelete, setItemDelete] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(false);
  function handleDelete(id) {
    setLoadingDelete(true);
    request
      .post(`/delete/${id}`)
      .then(() => {
        setLoadingDelete(false);
        setShowModalDelete(false);
        getData();
      })
      .catch((error) => {
        setLoadingDelete(false);
        console.log(error);
      });
  }

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading . . .</h1>
      </div>
    );
  }
  if (data.length < 1) {
    <div className="loading">
      <h1>Data Kosong</h1>
    </div>;
  } else {
    return (
      <>
        <h1>Tabel Page</h1>
        <table cellSpacing={20}>
          <thead>
            <tr>
              <th>#Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td style={{ display: "flex", gap: "3px" }}>
                    <Link to={`/home/detail/${item.id}`}>
                      <button className="btn-primary">Detail</button>
                    </Link>
                    <Link to={`/home/update/${item.id}`}>
                      <button className="btn-success">Edit</button>
                    </Link>
                    <button
                      className="btn-danger"
                      onClick={() => {
                        setShowModalDelete(true);
                        setIdDelete(item.id);
                        setItemDelete(item.name);
                      }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {showModalDelete && (
          <DeleteModal
            handleClose={() => setShowModalDelete(false)}
            handleDelete={() => handleDelete(idDelete)}
            nameItem={itemDelete}
            loadingText={loadingDelete}
          />
        )}
      </>
    );
  }
};

export default Tabel;
