import React, { useEffect, useState } from "react";

import "../styles/links.css";
import LinkForm from "./LinkForm";
import { db } from "../firebase";
import { toast } from "react-toastify";

const Links = () => {
  const [Links, setLinks] = useState([]);
  const [CurrentId, setCurrentId] = useState("");

  const addOrEditLinks = async (linkObject) => {
    if (CurrentId === "") {
      await db.collection("links").doc().set(linkObject);
      toast("New Link Addres", { type: "success", autoClose: 2000 });
    } else {
      await db.collection("links").doc(CurrentId).update(linkObject);
      toast("Link Updated Succesfully", { type: "info", autoClose: 2000 });
      setCurrentId("");
    }
  };

  const onDeleteLink = async (id) => {
    if (window.confirm("are you sure you want to delete this link?")) {
      await db.collection("links").doc(id).delete();
      toast("Link Removed Successfully", { type: "error", autoClose: 2000 });
    }
  };

  const getLinks = async () => {
    await db.collection("links").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <React.Fragment>
      <div className="col-lg-8 col-12 mb-5">
        <LinkForm {...{ addOrEditLinks, CurrentId, Links }} />
      </div>
      <div className="col-lg-8 col-12">
        <h2>Your links</h2>
        {Links.map((link) => (
          <div className="linkContainer mb-3" key={link.id}>
            <div>
              <div className="d-flex justify-content-between">
                <h3>{link.name}</h3>
                <div>
                  <i
                    className="material-icons text-danger"
                    onClick={() => onDeleteLink(link.id)}
                  >
                    close
                  </i>
                  <i
                    className="material-icons text-primary"
                    onClick={() => setCurrentId(link.id)}
                  >
                    create
                  </i>
                </div>
              </div>
              <h4>{link.description}</h4>
              <a href={link.url} target="_blank" rel="noreferrer">
                Go To Website
              </a>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Links;
