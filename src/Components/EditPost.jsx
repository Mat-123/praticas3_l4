import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { myApiUrl } from '../baseApiUrl';

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const apiKey = localStorage.getItem('apiKey');
      const user = localStorage.getItem('user');
      const authString = btoa(`${user}:${apiKey}`);

      try {
        const response = await fetch(`${myApiUrl}/posts/${id}`, {
          headers: {
            Authorization: `Basic ${authString}`,
          },
        });

        if (response.ok) {
          const postData = await response.json();
          setPost(postData);
          setTitle(postData.title.rendered);
          setContent(postData.content.rendered);
        } else {
          console.error('Error fetching post');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiKey = localStorage.getItem('apiKey');
    const user = localStorage.getItem('user');
    const authString = btoa(`${user}:${apiKey}`);

    try {
      const response = await fetch(`${myApiUrl}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${authString}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        console.log('Post updated successfully.');
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
          window.location.replace('/');
        }, 2000);
      } else {
        console.error('Error updating post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content:</label>
          <textarea
            id="content"
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            required
          ></textarea>
        </div>
        <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-secondary" onClick={() => window.location.replace('/')}>Cancel</button>
        <button type="submit" className="btn btn-primary mr-2">Save Changes</button>
        </div>
      </form>
      {showSuccessAlert && (
        <div className="alert alert-success mt-3" role="alert">
          Post updated successfully!
        </div>
      )}
    </div>
  );
};

export default EditPost;
