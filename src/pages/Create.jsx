import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../components";
import { request } from "../utils/request";

const Create = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    let data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("phone", phone);
    data.append("address", address);
    data.append("city", city);
    data.append("photo", photo);

    request
      .post("/create", data)
      .then(() => {
        setLoading(false);
        navigate("/home/tabel");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Create</h1>
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
          required
        />
        <Input
          label="Phone Number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter Phone"
          required
        />
        <Input
          label="Address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Address"
          required
        />
        <Input
          label="City"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          required
        />

        {/* Cara 1 */}
        <p>Image</p>
        <img
          className="img-preview"
          src={image ? image : photo === null ? imageunchoosed : photo}
          alt="No Picture choosed"
          onClick={() => {
            document.querySelector("#input-file").click();
          }}
        />

        {/* Cara 2 */}
        {/* {image ? ( */}
        {/* <img */}
        {/* src={image} */}
        {/* alt="" */}
        {/* onClick={() => { */}
        {/* document.querySelector("#input-file").click(); */}
        {/* }} */}
        {/* /> */}
        {/* ) : ( */}
        {/* <div */}
        {/* onClick={() => { */}
        {/* document.querySelector("#input-file").click(); */}
        {/* }} */}
        {/* > */}
        {/* <h5>Choose a file</h5> */}
        {/* <p>Pilih gambar untuk diupload</p> */}
        {/* </div> */}
        {/* )} */}

        <input
          type="file"
          hidden
          id="input-file"
          onChange={fileChangeHandler}
        />
        <Button
          title={loading ? "Creating..." : "Create"}
          type="submit"
          className="btn-primary"
        />
      </form>
    </div>
  );
};

export default Create;
