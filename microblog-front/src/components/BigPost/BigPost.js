import React, { useState, useEffect } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import CommentsSection from "../CommentsSection/CommentsSection";
import axios from "axios";
import "./BigPost.modules.scss";
import DeleteForever from "@material-ui/icons/DeleteForever";
import Create from "@material-ui/icons/Create";
import CodeIcon from "@material-ui/icons/Code";
import Modal from "@material-ui/core/Modal";
import TagBox from "../TagBox/TagBox";
import AuthorBox from "../AuthorBox/AuthorBox";
let HtmlToReactParser = require("html-to-react").Parser;

const BigPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({
    authors: [],
    tags: [],
  });
  const [tags, setTags] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [didDelete, setDidDelete] = useState(false);
  const [deleteAttempt, setDeleteAttempt] = useState(false);

  const [auth, setAuth] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    role ? setAuth(role) : setAuth("");
  }, []);

  const handleAmIAuthor = () => {
    const myMail = localStorage.getItem("mail");
    console.log(myMail);
    console.log(post.authors);
    console.log(post.tags);
    console.log(authors.map((el) => el.mail));
    const amIAuthor = post.authors.some((author) => author.mail == myMail);
    console.log(amIAuthor);
    return amIAuthor;
  };

  const injectSafelyRichContent = () => {
    const htmlToReactParser = new HtmlToReactParser();
    const reactElement = htmlToReactParser.parse(post.postRichContent);
    return reactElement;
  };

  const handleDeletePost = () => {
    axios
      .delete(`/api/posts/${id}`)
      .then((res) => {
        console.log(res);

        setDidDelete(true);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdatePost = () => {
    axios
      .put(`/api/posts/${id}`)
      .then((res) => {
        console.log(res);
        setPost((state) => res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`/api/posts/${id}`)
      .then((res) => {
        console.log(res);
        setPost((state) => res.data);
        // setAuthors(state => res.data.authors)
        // setTags(state => res.data.tags)
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  const styles = {
    fontSize: "3rem",
    marginRight: ".5rem",
  };
  return error || didDelete ? (
    <Redirect to="/" />
  ) : (
    <article className="bigpost">
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={modalOpen}
        setOpen={setModalOpen}
      >
        <>
          <div className="modal__box">
            <div className="modal__codebox">
              <p className="modal__json">{JSON.stringify(post)}</p>
            </div>
            <button
              className="modal__exit"
              onClick={(e) => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </>
      </Modal>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={deleteAttempt}
        setOpen={setDeleteAttempt}
      >
        <>
          <div className="modal__box">
            <h2> Do you really wanna delete this post?</h2>
            <button
              className="modal__exit"
              onClick={(e) => setDeleteAttempt(false)}
            >
              Abort
            </button>
            <button className="modal__exit" onClick={handleDeletePost}>
              Delete
            </button>
          </div>
        </>
      </Modal>
      <div className="bigpost__headimg"></div>
      <div className="bigpost__header">
        <div className="bigpost__summary">
          <h1 className="bigpost__title">{post.postTitle}</h1>

          <AuthorBox
            entityEditable={false}
            authorList={post.authors.map((author) => author.mail)}
          />
          <TagBox
            entityEditable={false}
            tagList={post.tags.map((tag) => tag.tagName)}
          />
        </div>
        {auth != "admin" && (auth === "" || !handleAmIAuthor()) ? null : (
          <div className="bigpost__actions">
            <div
              onClick={(e) => setDeleteAttempt(true)}
              className="bigpost__delete-btn bigpost__action"
            >
              <DeleteForever style={styles} />
              <span>DELETE</span>
            </div>
            <Link className="link" to={`/edit/${id}`}>
              <div className="bigpost__edit bigpost__action">
                <Create style={styles} />
                <span>EDIT</span>
              </div>
            </Link>
            <div
              className="bigpost__json bigpost__action"
              onClick={(e) => setModalOpen(true)}
            >
              <CodeIcon style={styles} /> <span>JSON</span>
            </div>
          </div>
        )}
      </div>
      <div className="bigpost__content">{injectSafelyRichContent()}</div>
      <CommentsSection />
    </article>
  );
};

export default BigPost;
