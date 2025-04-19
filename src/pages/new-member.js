import { useState } from "react";
import NavbarSignUp from "../components/navbar-signup";
import { db } from "../database/firebase";
import { collection, addDoc } from "firebase/firestore";

function NewMember() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "newMembers"), formData);
      setFormSubmitted(true);

      // reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        state: "",
        country: "",
        zip: ""
      });
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  return (
    <>
      <NavbarSignUp />
      <div className="container py-5">
        <div className="row">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
            <form className="row g-3 bg-light p-4 rounded shadow-sm" onSubmit={handleSubmit}>
              {Object.entries(formData).map(([key, value]) => (
                <div className="col-12" key={key}>
                  <label htmlFor={key} className="form-label text-capitalize">
                    {key === "zip" ? "Zip Code" : key.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    type={key === "password" ? "password" : "text"}
                    className="form-control"
                    id={key}
                    value={value}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                    required
                  />
                  <label className="form-check-label" htmlFor="gridCheck">
                    I am more than 18 years old.
                  </label>
                </div>
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary w-100">
                  Sign up
                </button>
              </div>

              {formSubmitted && (
                <div className="col-12 mt-3">
                  <div className="alert alert-success text-center">
                    Form submitted successfully! We’ll create your account and send it to you soon.
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewMember;
