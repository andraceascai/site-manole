import { useState } from "react";
import { useSEO } from "../hooks/useSEO";
import { actorBlogPosts, mockComments } from "../data/mockData";
import "./Blog.css";

const EMOJIS = ["❤️", "👏", "🎭", "🌟", "🔥", "😂"];

export default function ActorBlog() {
  useSEO(
    "Blog - Manole",
    "Read Manole's thoughts, experiences, and insights about the world of performing arts."
  );

  const [comments, setComments] = useState(mockComments);
  const [reactions, setReactions] = useState<
    Record<string, Record<string, number>>
  >({});
  const [userReactions, setUserReactions] = useState<
    Record<string, Set<string>>
  >({});
  const [newComment, setNewComment] = useState<
    Record<string, { name: string; email: string; text: string }>
  >({});

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
    <div className="blog-page">
      <div className="container section-padding">
        <h1 className="page-title fade-in">Gânduri care nu cer aplauze</h1>
        <p className="page-subtitle fade-in">
          Aici scriu ce nu apuc să spun pe scenă, emoții aruncate între
          repetiții și viață
        </p>

        <div className="blog-posts">
          {actorBlogPosts.map((post, index) => (
            <article
              key={post.id}
              className="blog-post fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {post.image_url && (
                <div className="post-image">
                  <img src={post.image_url} alt={post.title} />
                </div>
              )}

              <div className="post-content">
                <div className="post-header">
                  <h2 className="post-title">{post.title}</h2>
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
                  <h3 className="comments-title">
                    Comentarii ({(comments[post.id] || []).length})
                  </h3>

                  <div className="comments-list">
                    {(comments[post.id] || []).map((comment) => (
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
                        <p className="comment-text">{comment.comment_text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="comment-form">
                    <h4>Lasă un comentariu</h4>
                    <input
                      type="text"
                      placeholder="Your Name"
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
                      placeholder="Your Email"
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
                      placeholder="Your Comment"
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
                      className="btn-primary"
                      onClick={() => handleSubmitComment(post.id)}
                    >
                      Postează
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
