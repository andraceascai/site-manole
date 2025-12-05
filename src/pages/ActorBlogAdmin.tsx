import { useEffect, useState } from "react";
import "./Blog.css";
import axios from "axios";
import Navbar from "../components/Navbar";
import Login from "./Login";

interface Comments {
  postID: number;
  comentariu: string;
  autor: string;
  mail: string;
  data: string;
  _id: string;
}

interface Postari {
  _id: string;
  postID: number;
  titlu: string;
  data: string;
  post: string;
  comentarii: Comments[];
}

export default function ActorBlogAdmin() {
  const [posts, setPosts] = useState<Postari[]>([]);

  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [titlu, setTitlu] = useState("");
  const [content, setContent] = useState("");

  const [commentInputs, setCommentsInputs] = useState<{
    [postID: number]: { nume: string; mail: string; comentariu: string };
  }>({});
  const [openComments, setOpenComments] = useState<{
    [postID: number]: boolean;
  }>({});

  const [isEditing, setIsEditing] = useState<{
    [postID: number]: boolean;
  }>({});
  const [editContent, setEditContent] = useState("");

  const handleSubmitComment = async (postID: number) => {
    const inputData = commentInputs[postID];
    console.log(postID, typeof postID);
    try {
      await axios.post(
        `http://localhost:3000/api/ganduri/comentarii/${postID}`,
        {
          postID: postID,
          comentariu: inputData.comentariu,
          autor: inputData.nume,
          mail: inputData.mail,
        }
      );
      setCommentsInputs({
        ...commentInputs,
        [postID]: { ...commentInputs[postID], comentariu: "" },
      });
    } catch (error) {
      console.error("Error posting comment: ", error);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (window.confirm("Esti sigur ca vrei sa stergi aceasta postare?")) {
      try {
        await axios.delete(`http://localhost:3000/api/post/delete/${id}`);
        setPosts(posts.filter((idea) => idea._id !== id));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleDeleteComment = async (postID: number, commentId: string) => {
    if (window.confirm("Esti sigur ca vrei sa stergi acest comentariu?")) {
      try {
        await axios.delete(
          `http://localhost:3000/api/ganduri/${postID}/comentarii/${commentId}`
        );
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  const handleEditSubmit = async (
    prev: string,
    _id: string,
    postID: number
  ) => {
    try {
      await axios.put(`http://localhost:3000/api/ganduri/${_id}`, {
        post: editContent,
      });
      if (prev === editContent) {
        window.confirm(
          "The content is the same, to submit please change the text"
        );
      } else {
        setIsEditing({
          ...isEditing,
          [postID]: false,
        });
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  useEffect(() => {
    const fetchPostari = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/ganduri`);
        setPosts(response.data.slice().reverse());
      } catch (error) {
        console.error("Error fetching repertorii:", error);
      }
    };
    fetchPostari();
  }, [handleSubmitComment, handleDeletePost, handleDeleteComment]);

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/ganduri", {
        titlu: titlu,
        post: content,
      });
      setTitlu("");
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const [loggedIn, setLoggdedIn] = useState<boolean>(
    localStorage.getItem("loggedIn") === "true"
  );

  return (
    <>
      {!loggedIn ? (
        <Login onLogin={() => setLoggdedIn(true)} />
      ) : (
        <div className="blog-page">
          <Navbar />
          <div className="container section-padding">
            <h1 className="page-title fade-in">Gânduri care nu cer aplauze</h1>
            <p className="page-subtitle fade-in">
              Aici scriu ce nu apuc să spun pe scenă, emoții aruncate între
              repetiții și viață
            </p>

            <div className="new-post-cta">
              <button
                className="postButton"
                onClick={() => setShowNewPostForm(!showNewPostForm)}
              >
                {showNewPostForm ? "Anulează" : "Creează o postare nouă"}
              </button>
            </div>

            {showNewPostForm && (
              <form
                className="new-post-form fade-in"
                onSubmit={handleSubmitPost}
              >
                <h4>Împărtășește-ți povestea</h4>
                <div className="form-row"></div>
                <input
                  type="text"
                  placeholder="Titlu *"
                  value={titlu}
                  onChange={(e) => setTitlu(e.target.value)}
                  required
                />
                <textarea
                  placeholder="Povestea ta... *"
                  rows={8}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="postButton"
                  onClick={handleSubmitPost}
                >
                  Postează
                </button>
              </form>
            )}

            <div className="blog-posts">
              {posts.map((post, index) => (
                <article
                  key={post.postID}
                  className="blog-post fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="post-content">
                    <button
                      className="delete-post-button"
                      onClick={() => handleDeletePost(post._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="edit-post-button"
                      onClick={() => {
                        setEditContent(post.post);
                        setIsEditing({
                          ...isEditing,
                          [post.postID]: !isEditing[post.postID],
                        });
                      }}
                    >
                      Edit
                    </button>

                    {isEditing[post.postID] && (
                      <form
                        onSubmit={() =>
                          handleEditSubmit(post.post, post._id, post.postID)
                        }
                        className="edit-form"
                      >
                        <div className="edit-form-content">
                          <textarea
                            className="edit-form-textarea"
                            value={editContent}
                            onChange={(event) =>
                              setEditContent(event.target.value)
                            }
                          />
                          <br />
                          <button className="edit-submit-button" type="submit">
                            Submit
                          </button>
                          <button
                            className="edit-cancel-button"
                            onClick={() =>
                              setIsEditing({
                                ...isEditing,
                                [post.postID]: !isEditing[post.postID],
                              })
                            }
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}

                    <div className="post-header">
                      <h2 className="post-title">{post.titlu}</h2>
                      <span className="post-date">{formatDate(post.data)}</span>
                    </div>

                    <div className="post-body">
                      {post.post.split("\n\n").map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>

                    <div className="post-comments-section">
                      <button
                        type="button"
                        className="comments-title"
                        onClick={() =>
                          setOpenComments({
                            ...openComments,
                            [post.postID]: !openComments[post.postID],
                          })
                        }
                      >
                        Comentarii ({post.comentarii.length})
                      </button>

                      {openComments[post.postID] && (
                        <>
                          <div className="comments-list">
                            {post.comentarii
                              .slice()
                              .reverse()
                              .map((comment, i) => (
                                <div
                                  key={i}
                                  className={`comment ${
                                    comment.mail === "marius27man@icloud.com"
                                      ? "actor-comment"
                                      : ""
                                  }`}
                                >
                                  <button
                                    className="delete-comment-button"
                                    onClick={() =>
                                      handleDeleteComment(
                                        post.postID,
                                        comment._id
                                      )
                                    }
                                  >
                                    Delete
                                  </button>
                                  <div className="comment-header">
                                    <span className="comment-author">
                                      {comment.autor}
                                    </span>
                                    <span className="comment-date">
                                      {formatDate(comment.data)}
                                    </span>
                                  </div>
                                  <p className="comment-text">
                                    {comment.comentariu}
                                  </p>
                                </div>
                              ))}
                          </div>

                          <div className="comment-form">
                            <h4 style={{ margin: "auto", marginBottom: "3%" }}>
                              Lasă un comentariu
                            </h4>
                            <input
                              type="text"
                              placeholder="Nume"
                              value={commentInputs[post.postID]?.nume || ""}
                              onChange={(e) =>
                                setCommentsInputs({
                                  ...commentInputs,
                                  [post.postID]: {
                                    ...commentInputs[post.postID],
                                    nume: e.target.value,
                                  },
                                })
                              }
                            />
                            <input
                              type="email"
                              placeholder="Email"
                              value={commentInputs[post.postID]?.mail || ""}
                              onChange={(e) =>
                                setCommentsInputs({
                                  ...commentInputs,
                                  [post.postID]: {
                                    ...commentInputs[post.postID],
                                    mail: e.target.value,
                                  },
                                })
                              }
                            />
                            <textarea
                              placeholder="Comentariu"
                              rows={4}
                              value={
                                commentInputs[post.postID]?.comentariu || ""
                              }
                              onChange={(e) =>
                                setCommentsInputs({
                                  ...commentInputs,
                                  [post.postID]: {
                                    ...commentInputs[post.postID],
                                    comentariu: e.target.value,
                                  },
                                })
                              }
                            />
                            <button
                              className="postButton"
                              onClick={() => handleSubmitComment(post.postID)}
                            >
                              Postează
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
