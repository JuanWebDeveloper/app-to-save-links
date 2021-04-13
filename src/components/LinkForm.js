import React, { useState, useEffect } from "react";

import "../styles/form.css";
import { db } from "../firebase";
import { toast } from "react-toastify";

const LinkForm = (props) => {
  const initialStateValues = {
    url: "",
    name: "",
    description: "",
  };

  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validURL = (str) => {
    let pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validURL(values.url)) {
      return toast("The url is invalid", { type: "warning", autoClose: 2000 });
    }

    props.addOrEditLinks(values);
    setValues({ ...initialStateValues });
  };

  const getLinkById = async (id) => {
    const doc = await db.collection("links").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.CurrentId === "") {
      setValues({ ...initialStateValues });
    } else {
      getLinkById(props.CurrentId);
    }
  }, [props.CurrentId]);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Add links</h2>
      <div className="form-group input-group">
        <div className="input-group-text icon">
          <i className="material-icons">insert_link</i>
        </div>
        <input
          type="text"
          className="form-control"
          name="url"
          placeholder="https://yoururl.com"
          onChange={handleInputChange}
          value={values.url}
        />
      </div>

      <div className="form-group input-group">
        <div className="input-group-text icon">
          <i className="material-icons">create</i>
        </div>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Website Name"
          onChange={handleInputChange}
          value={values.name}
        />
      </div>

      <div className="form-group">
        <textarea
          className="form-control"
          name="description"
          placeholder="Write A Descriptions"
          onChange={handleInputChange}
          value={values.description}
        ></textarea>
      </div>

      <button className="btn btn-block">
        {props.CurrentId === "" ? "Save" : "Update"}
      </button>
    </form>
  );
};

export default LinkForm;
