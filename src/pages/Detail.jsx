import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { request } from "../utils/request";

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    function getData() {
      request
        .get(`/show/${id}`)
        .then((response) => {
          setLoading(false);
          setData(response.data.data);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
    getData();
  }, []);
  if (loading) {
    return (
      <div className="loading">
        <h1>Loading . . .</h1>
      </div>
    );
  } else {
    return (
      <div className="detail">
        <Link to="/home/tabel">
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
                style={{ borderRadius: "12px", height: "70vh" }}
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
  }
};

export default Detail;
