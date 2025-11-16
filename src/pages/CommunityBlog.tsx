import { useState } from "react";
import { useSEO } from "../hooks/useSEO";
import { communityBlogPosts as initialPosts } from "../data/mockData";
import "./Blog.css";

const EMOJIS = ["❤️", "👏", "🎭", "🌟", "🔥", "😂"];

export default function CommunityBlog() {
  useSEO(
    "Community Blog - Manoleee",
    "Join the community! Share your thoughts, stories, and connect with fellow Manole fans and art enthusiasts."
  );

  const [posts, setPosts] = useState(initialPosts);
  const [comments, setComments] = useState<Record<string, any[]>>({});
  const [reactions, setReactions] = useState<
    Record<string, Record<string, number>>
  >({});
  const [userReactions, setUserReactions] = useState<
    Record<string, Set<string>>
  >({});
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    author_name: "",
    author_email: "",
    title: "",
    content: "",
  });
  const [newComment, setNewComment] = useState<
    Record<string, { name: string; email: string; text: string }>
  >({});
  const [showComments, setShowComments] = useState(false);

  const handleReaction = (postId: string, emoji: string) => {
    const userPostReactions = userReactions[postId] || new Set();
    const hasReacted = userPostReactions.has(emoji);

    setUserReactions((prev) => {
      const newSet = new Set(prev[postId] || []);
      if (hasReacted) {
        newSet.delete(emoji);
      } else {
        newSet.add(emoji);
      }
      return { ...prev, [postId]: newSet };
    });

    setReactions((prev) => {
      const postReactions = prev[postId] || {};
      const count = postReactions[emoji] || 0;
      return {
        ...prev,
        [postId]: {
          ...postReactions,
          [emoji]: hasReacted ? Math.max(0, count - 1) : count + 1,
        },
      };
    });
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newPost.author_name ||
      !newPost.author_email ||
      !newPost.title ||
      !newPost.content
    ) {
      alert("Please fill in all fields");
      return;
    }

    const newPostObj = {
      id: Date.now().toString(),
      ...newPost,
      image_url: "",
      created_at: new Date().toISOString(),
    };

    setPosts((prev) => [newPostObj, ...prev]);
    setNewPost({ author_name: "", author_email: "", title: "", content: "" });
    setShowNewPostForm(false);
  };

  const handleSubmitComment = (postId: string) => {
    const commentData = newComment[postId];
    if (
      !commentData ||
      !commentData.name ||
      !commentData.email ||
      !commentData.text
    ) {
      alert("Please fill in all fields");
      return;
    }

    const newCommentObj = {
      id: Date.now().toString(),
      author_name: commentData.name,
      author_email: commentData.email,
      comment_text: commentData.text,
      is_actor_response: false,
      created_at: new Date().toISOString(),
    };

    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newCommentObj],
    }));

    setNewComment((prev) => ({
      ...prev,
      [postId]: { name: "", email: "", text: "" },
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="blog-page community-blog">
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
          <form className="new-post-form fade-in" onSubmit={handleSubmitPost}>
            <h4>Împărtășește-ți povestea</h4>
            <div className="form-row">
              <input
                type="text"
                placeholder="Nume *"
                value={newPost.author_name}
                onChange={(e) =>
                  setNewPost({ ...newPost, author_name: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email *"
                value={newPost.author_email}
                onChange={(e) =>
                  setNewPost({ ...newPost, author_email: e.target.value })
                }
                required
              />
            </div>
            <input
              type="text"
              placeholder="Titlu *"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Povestea ta... *"
              rows={8}
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
              required
            />
            <button type="submit" className="postButton">
              Postează
            </button>
          </form>
        )}

        <div className="blog-posts">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className="blog-post community-post fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="post-content">
                <div className="post-header">
                  <div>
                    <h2 className="post-title">{post.title}</h2>
                    <span className="post-author">de {post.author_name}</span>
                  </div>
                  <span className="post-date">
                    {formatDate(post.created_at)}
                  </span>
                </div>

                <div className="post-body">
                  {post.content.split("\n\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                <div className="post-reactions">
                  {EMOJIS.map((emoji) => {
                    const count = reactions[post.id]?.[emoji] || 0;
                    const userReacted = userReactions[post.id]?.has(emoji);
                    return (
                      <button
                        key={emoji}
                        className={`reaction-btn ${
                          userReacted ? "active" : ""
                        }`}
                        onClick={() => handleReaction(post.id, emoji)}
                      >
                        <span className="reaction-emoji">{emoji}</span>
                        {count > 0 && (
                          <span className="reaction-count">{count}</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="post-comments-section">
                  {/* <h3
                    className="comments-title"
                    onClick={() => setShowComments(!showComments)}
                  >
                    Comentarii ({(comments[post.id] || []).length})
                  </h3> */}
                  <button
                    type="button"
                    className="comments-title"
                    onClick={() => setShowComments(!showComments)}
                  >
                    Comentarii ({(comments[post.id] || []).length})
                  </button>

                  {showComments &&
                    comments[post.id] &&
                    comments[post.id].length > 0 && (
                      <>
                        <div className="comments-list">
                          {comments[post.id].map((comment) => (
                            <div
                              key={comment.id}
                              className={`comment ${
                                comment.is_actor_response ? "actor-comment" : ""
                              }`}
                            >
                              <div className="comment-header">
                                <span className="comment-author">
                                  {comment.author_name}
                                  {comment.is_actor_response && (
                                    <span className="actor-badge">Actor</span>
                                  )}
                                </span>
                                <span className="comment-date">
                                  {formatDate(comment.created_at)}
                                </span>
                              </div>
                              <p className="comment-text">
                                {comment.comment_text}
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
                            value={newComment[post.id]?.name || ""}
                            onChange={(e) =>
                              setNewComment((prev) => ({
                                ...prev,
                                [post.id]: {
                                  ...(prev[post.id] || {
                                    name: "",
                                    email: "",
                                    text: "",
                                  }),
                                  name: e.target.value,
                                },
                              }))
                            }
                          />
                          <input
                            type="email"
                            placeholder="Email"
                            value={newComment[post.id]?.email || ""}
                            onChange={(e) =>
                              setNewComment((prev) => ({
                                ...prev,
                                [post.id]: {
                                  ...(prev[post.id] || {
                                    name: "",
                                    email: "",
                                    text: "",
                                  }),
                                  email: e.target.value,
                                },
                              }))
                            }
                          />
                          <textarea
                            placeholder="Comentariu"
                            rows={4}
                            value={newComment[post.id]?.text || ""}
                            onChange={(e) =>
                              setNewComment((prev) => ({
                                ...prev,
                                [post.id]: {
                                  ...(prev[post.id] || {
                                    name: "",
                                    email: "",
                                    text: "",
                                  }),
                                  text: e.target.value,
                                },
                              }))
                            }
                          />
                          <button
                            className="postButton"
                            onClick={() => handleSubmitComment(post.id)}
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
  );
}
