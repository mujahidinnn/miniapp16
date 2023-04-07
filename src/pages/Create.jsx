import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../api/api";
import { Input, Button } from "../components";

const Create = () => {
  // state untuk mengubah status button
  const [buttonStatus, setButtonStatus] = useState("Create");

  // State untuk menavigasi
  const navigate = useNavigate();

  // State untuk menyimpan gambar preview sebelum dikirimkan
  const [image, setImage] = useState(null);

  // Fungsi untuk event onChange pada input type file
  const fileChangeHandler = (e) => {
    // Mengambil value bukan (e.target.value) tetapi (e.target.files[0])
    setPhoto(e.target.files[0]);

    // Membuat Object URL agar bisa ditampilkan gambar yang dipilih
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [photo, setPhoto] = useState(null);

  // Link gambar ketika user belum memilih gambar
  const imageunchoosed =
    "https://i0.wp.com/css-tricks.com/wp-content/uploads/2015/11/drag-drop-upload-2.gif";

  const handleSubmit = (e) => {
    // Agar tidak terjadi render ulang
    e.preventDefault();

    // Merubah status button ketika proses mengirim data
    setButtonStatus("Wait creating...");

    let data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("phone", phone);
    data.append("address", address);
    data.append("city", city);
    data.append("photo", photo);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/create",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };

    // Jangan lupa mengimport instance dari file api.js
    instance
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));

        // Merubah status button ketika proses mengirim selesai/berhasil
        setButtonStatus("Create");

        // Menavigasi ke halaman Tabel
        navigate("/home/tabel");
      })
      .catch((error) => {
        console.log(error);

        // Merubah status button ketika proses mengirim gagal
        setButtonStatus("Create");
      });
  };

  return (
    <div>
      <h1>➕ Create</h1>
      <form
        // Panggil fungsi handleSubmit dengan onSubmit
        onSubmit={handleSubmit}
        className="form"
      >
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

        {/* Image Preview = gambar ditampilkan sebelum dikirim */}

        {/* Cara 1 */}
        <p>Image</p>
        <img
          className="img-preview"
          src={image ? image : photo === null ? imageunchoosed : photo}
          alt=""
          // Event onClick menjalankan function agar ketika gambar diklik maka input dengan id: input-file juga diklik
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
          // Input type file ini ini dihidden agar tidak tampil di Web
          hidden
          // Id diberikan agar ketika element gambar diklik input ini juga ikut diklik
          id="input-file"
          // Fungsi fileChangeHandler dipanggil di onChange
          onChange={fileChangeHandler}

          // Jangan dikasih value nanti error karena input type file tidak menerima value
        />
        <Button title={buttonStatus} type="submit" className="btn-primary" />
      </form>
    </div>
  );
};

export default Create;
