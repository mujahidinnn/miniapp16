import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Delete from "./Delete";

const Tabel = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const checkUserToken = () => {
      const userToken = localStorage.getItem("token");
      if (!userToken || userToken === "undefined") {
        return navigate("/");
      }
    };
    checkUserToken();
  }, []);

  useEffect(() => {
    function getData() {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://frontendreq.pondokprogrammer.com/api/index",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          setData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getData();
  }, [data]);

  // delete
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [loadDel, setLoadDel] = useState(false);
  function handleDelete(id) {
    setLoadDel(true);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://frontendreq.pondokprogrammer.com/api/delete/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .request(config)
      .then(() => {
        setLoadDel(false);
        setShowModalDelete(false);
      })
      .catch((error) => {
        setLoadDel(false);
        console.log(error);
      });
  }

  const modalDeleting = (
    <div className="bg-modal">
      <div className="content-modal">
        <h1>Please wait</h1>
        <h2 style={{ color: "red" }}>Process Deleting...</h2>
      </div>
    </div>
  );
  return (
    <div>
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
                  <Link to={`/detail/${item.id}`}>
                    <button className="btn-primary">Detail</button>
                  </Link>
                  <Link to={`/home/update/${item.id}`}>
                    <button className="btn-success">Udpate</button>
                  </Link>
                  <button
                    className="btn-danger"
                    onClick={() => {
                      setShowModalDelete(true);
                      handleDelete(item.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {loadDel && modalDeleting}
    </div>
  );
};

export default Tabel;
