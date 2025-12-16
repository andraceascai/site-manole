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
  nume: string;
  mail: string;
  data: string;
  post: string;
  comentarii: Comments[];
}

export default function CommunityBlogAdmin() {
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [posts, setPosts] = useState<Postari[]>([]);
  const [titlu, setTitlu] = useState("");
  const [nume, setNume] = useState("");
  const [mail, setMail] = useState("");
  const [content, setContent] = useState("");
  const [commentInputs, setCommentsInputs] = useState<{
    [postID: number]: { nume: string; mail: string; comentariu: string };
  }>({});
  const [openComments, setOpenComments] = useState<{
    [postID: number]: boolean;
  }>({});

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/scena_voastra`, {
        titlu: titlu,
        nume: nume,
        mail: mail,
        post: content,
      });
      setTitlu("");
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleSubmitComment = async (postID: number) => {
    const inputData = commentInputs[postID];
    console.log(postID, typeof postID);
    try {
      await axios.post(`${apiUrl}/scena_voastra/comentarii/${postID}`, {
        postID: postID,
        comentariu: inputData.comentariu,
        autor: inputData.nume,
        mail: inputData.mail,
      });
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
        await axios.delete(`${apiUrl}/communitypost/delete/${id}`);
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
          `${apiUrl}/scena_voastra/${postID}/comentarii/${commentId}`
        );
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  useEffect(() => {
    const fetchPostari = async () => {
      try {
        const response = await axios.get(`${apiUrl}/scena_voastra`);
        setPosts(response.data.slice().reverse());
      } catch (error) {
        console.error("Error fetching repertorii:", error);
      }
    };
    fetchPostari();
  }, [handleSubmitComment]);

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
        <div className="blog-page -blog">
          <Navbar />
          <div className="container section-padding">
            <h1 className="page-title fade-in">De vorbă cu voi</h1>
            <p className="page-subtitle fade-in">
              Voi scrieți, eu citesc, și uneori răspund. Un loc pentru poveștile
              voastre.
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
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Nume *"
                    value={nume}
                    onChange={(e) => setNume(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    required
                  />
                </div>
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
                  key={post.titlu}
                  className="blog-post community-post fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="post-content">
                    <button
                      className="delete-post-button"
                      onClick={() => handleDeletePost(post._id)}
                    >
                      Delete
                    </button>
                    <div className="post-header">
                      <div>
                        <h2 className="post-title">{post.titlu}</h2>
                        <span className="post-author">de {post.nume}</span>
                      </div>
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
                                    comment.mail === "marius27man@yahoo.com"
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
                                      {comment.mail ===
                                        "marius27man@icloud.com" && (
                                        <span></span>
                                      )}
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
