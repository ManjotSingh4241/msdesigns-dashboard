import { useState } from "react";
import { db, storage } from "../database/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import NavbarSignup from "../components/navbar-signup";
import { v4 as uuidv4 } from "uuid";

function Landing() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = "";

      if (imageFile) {
        const imageRef = ref(storage, `products/${uuidv4()}-${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "products"), {
        ...formData,
        imageUrl: imageUrl,
      });

      setSuccess(true);
      setUploading(false);
      setFormData({ title: "", description: "", price: "" });
      setImageFile(null);
    } catch (error) {
      console.error("Error uploading product:", error);
      setUploading(false);
    }
  };

  return (
    <>
      <NavbarSignup />
      <div className="container py-5">
        <div className="row">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto shadow-lg rounded">
            <h1>Upload my Product</h1>
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-12">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="col-12">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" value={formData.description} onChange={handleChange} required />
              </div>
              <div className="col-12">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="text" className="form-control" id="price" value={formData.price} onChange={handleChange} required />
              </div>
              <div className="col-12">
                <label htmlFor="productImage" className="form-label">Product Image</label>
                <input type="file" className="form-control" id="productImage" onChange={handleImageChange} accept="image/*" required />
              </div>
              <div className="col-12">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="gridCheck" required />
                  <label className="form-check-label" htmlFor="gridCheck">
                    I am not violating the t&c.
                  </label>
                </div>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary w-100" disabled={uploading}>
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
              {success && (
                <div className="alert alert-success mt-3">
                  Product uploaded successfully!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
