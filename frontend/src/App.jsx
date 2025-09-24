import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_BASE_URL = "http://localhost:2030/jenkins-back/api/posts";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState("list"); // 'list', 'detail', 'form'
  const [selectedPost, setSelectedPost] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);

  // Fetch all posts from the backend
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE_URL);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single post by ID
  const fetchPostById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      setSelectedPost(response.data);
      setView("detail");
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for creating or updating a post
  const handleSavePost = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await axios.put(`${API_BASE_URL}/${formData.id}`, formData);
      } else {
        await axios.post(API_BASE_URL, formData);
      }
      setFormData({ title: "", content: "" });
      setView("list");
      fetchPosts();
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  // Handle post deletion
  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Reset form and navigate to the create view
  const handleCreateNew = () => {
    setFormData({ title: "", content: "" });
    setView("form");
  };

  // Populate form with post data for editing
  const handleEditPost = (post) => {
    setFormData(post);
    setView("form");
  };

  // Fetch posts on initial component load
  useEffect(() => {
    fetchPosts();
  }, []);

  const renderView = () => {
    if (loading) {
      return (
        <div className="loading-spinner">
          <svg
            className="spinner"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      );
    }
    switch (view) {
      case "list":
        return (
          <div className="container-padding">
            <div className="flex-between">
              <h2 className="page-title">Blog Posts</h2>
              <button onClick={handleCreateNew} className="btn btn-primary">
                Create New Post
              </button>
            </div>
            <div className="post-list">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post.id} className="post-card">
                    <h3
                      className="post-title"
                      onClick={() => fetchPostById(post.id)}
                    >
                      {post.title}
                    </h3>
                    <p className="post-content">
                      {post.content.substring(0, 150)}...
                    </p>
                    <div className="post-actions">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="btn btn-edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="btn btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-posts">No blog posts found.</p>
              )}
            </div>
          </div>
        );

      case "detail":
        return (
          <div className="container-padding">
            <div className="detail-container">
              <h2 className="detail-title">{selectedPost.title}</h2>
              <p className="detail-content">{selectedPost.content}</p>
              <p className="detail-date">
                Posted on:{" "}
                {new Date(selectedPost.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button onClick={() => setView("list")} className="btn btn-neutral">
              Back to List
            </button>
          </div>
        );

      case "form":
        return (
          <div className="container-padding">
            <h2 className="form-title">
              {formData.id ? "Edit Post" : "Create New Post"}
            </h2>
            <form onSubmit={handleSavePost} className="form-container">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  required
                ></textarea>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {formData.id ? "Update" : "Create"} Post
                </button>
                <button
                  type="button"
                  onClick={() => setView("list")}
                  className="btn btn-neutral"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="app-container">{renderView()}</div>;
};

export default App;
