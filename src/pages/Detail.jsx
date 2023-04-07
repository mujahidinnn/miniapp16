import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    function getData() {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://frontendreq.pondokprogrammer.com/api/show/${id}`,
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
  }, []);
  return (
    <div className="detail">
      <Link to="/home">
        <h1
          style={{
            color: "white",
            background: "#6889ff",
            width: "max-content",
            padding: "3px 7px",
          }}
        >
          Back
        </h1>
      </Link>
      {data?.map((item) => {
        return (
          <div key={item.id}>
            <h2>#{item.id}</h2>
            <h3 style={{ textAlign: "" }}>{item.name}</h3>
            <img
              src={item.photo}
              alt={item.name}
              style={{ borderRadius: "12px",height:"70vh" }}
            />
            <h2>
              📌 {item.address}, {item.city}
            </h2>
            <h2>📞 {item.phone}</h2>
            <h2>✉️ {item.email}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default Detail;
