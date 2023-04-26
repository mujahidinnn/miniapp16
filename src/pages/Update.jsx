import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input } from "../components";
import { request } from "../utils/request";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
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
      request
        .get(`/show/${id}`)
        .then((response) => {
          const res = response?.data?.data[0];
          setName(res?.name);
          setEmail(res?.email);
          setPhone(res?.phone);
          setAddress(res?.address);
          setCity(res?.city);
          setPhoto(res?.photo);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let data = new FormData();
    if (image !== null) {
      data.append("photo", photo);
    }
    data.append("name", name);
    data.append("email", email);
    data.append("phone", phone);
    data.append("address", address);
    data.append("city", city);

    request
      .post(`/UP/${id}`, data, {
        headers: {
          "Content-Type": "multipart/formdata",
        },
      })
      .then(() => {
        setLoading(false);
        navigate("/home/tabel");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Update</h1>
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
        <Button
          title={loading ? "Updating..." : "Update"}
          type="submit"
          className="btn-primary"
        />
      </form>
    </div>
  );
};

export default Update;
