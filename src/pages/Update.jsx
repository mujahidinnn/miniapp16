import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../api/api";
import { Input, Button } from "../components";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const fileChangeHandler = (e) => {
    setPhoto(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [photo, setPhoto] = useState(null);

  const imageunchoosed =
    "https://i0.wp.com/css-tricks.com/wp-content/uploads/2015/11/drag-drop-upload-2.gif";

  useEffect(() => {
    function getData() {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `/show/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      instance
        .request(config)
        .then((response) => {
          setName(response.data.data[0].name);
          setEmail(response.data.data[0].email);
          setPhone(response.data.data[0].phone);
          setAddress(response.data.data[0].address);
          setCity(response.data.data[0].city);
          setPhoto(response.data.data[0].photo);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();
    if (image !==null) {
      data.append("photo", photo);
    }
    data.append("name", name);
    data.append("email", email);
    data.append("phone", phone);
    data.append("address", address);
    data.append("city", city);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `/UP/${id}`,
      headers: {
        "Content-Type": "multipart/formdata",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };

    instance
      .request(config)
      .then((res) => {
        console.log(res);
        navigate("/home/tabel");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>➕ Update</h1>
      <form onSubmit={handleSubmit} className="form">
        <Input
          label="Nama Wisata"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        <Input
          label="Phone Number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter Phone"
        />
        <Input
          label="Address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Address"
        />
        <Input
          label="City"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <p>Image</p>
        <img
          className="img-preview"
          src={image ? image : photo === null ? imageunchoosed : photo}
          alt=""
          onClick={() => {
            document.querySelector("#input-file").click();
          }}
        />
        <input
          type="file"
          hidden
          accept=".jpg, .jpeg, .png"
          id="input-file"
          onChange={fileChangeHandler}
        />
        <Button title="Update" type="submit" className="btn-primary" />
      </form>
    </div>
  );
};

export default Update;
