import { useEffect, useState } from "react";
import { useSEO } from "../hooks/useSEO";
import "./Blog.css";
import axios from "axios";
import Navbar from "../components/Navbar";

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

export default function ActorBlog() {
  useSEO("Blog Manole", "Marius Manole");
  const [posts, setPosts] = useState<Postari[]>([]);

  const [commentInputs, setCommentsInputs] = useState<{
    [postID: number]: { nume: string; mail: string; comentariu: string };
  }>({});
  const [openComments, setOpenComments] = useState<{
    [postID: number]: boolean;
  }>({});

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
  }, [handleSubmitComment]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="blog-page">
        <Navbar />
        <div className="container section-padding">
          <h1 className="page-title fade-in">Gânduri care nu cer aplauze</h1>
          <p className="page-subtitle fade-in">
            Aici scriu ce nu apuc să spun pe scenă, emoții aruncate între
            repetiții și viață
          </p>

          <div className="blog-posts">
            {posts.map((post, index) => (
              <article
                key={post.postID}
                className="blog-post fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="post-content">
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
                            value={commentInputs[post.postID]?.comentariu || ""}
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
    </>
  );
}
