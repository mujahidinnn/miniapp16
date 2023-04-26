import { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { useNavigate } from "react-router-dom";
import { request } from "../utils/request";

const Home = () => {
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

  useEffect(() => {
    setLoading(true);
    const getData = () => {
      request
        .get("/index")
        .then((response) => {
          setLoading(false);
          setData(response.data.data.reverse());
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    getData();
  }, []);

  // Search
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

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
      <div className="container-home">
        <div className="home-head">
          <h2>Hi, {localStorage.getItem("name-user")}</h2>
          <DebounceInput
            minLength={2}
            className="search"
            placeholder="Cari wisata..."
            style={{ width: "500px" }}
            debounceTimeout={1000}
            onChange={handleSearch}
          />
        </div>
        <div className="wrapper-card">
          {data
            ?.filter((item) => {
              return search === ""
                ? {}
                : item.name.toLowerCase().includes(search);
            })
            .map((item) => {
              return (
                <div className="card" key={item.id}>
                  <img className="img-card" src={item.photo} alt={item.name} />
                  <div className="detail">
                    <h4>{item.name}</h4>
                    <p>
                      {item.address}, {item.city}
                    </p>
                    <p>{item.phone}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
};

export default Home;
