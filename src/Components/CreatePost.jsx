import React, { useState } from 'react';
import { myApiUrl } from '../baseApiUrl';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiKey = localStorage.getItem('apiKey');
    const user = localStorage.getItem('user');
    const authString = btoa(`${user}:${apiKey}`);

    try {
      const response = await fetch(`${myApiUrl}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${authString}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        console.log('Post created successfully.');
        setTitle('');
        setContent('');
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
          window.location.replace('/');
        }, 2000);
      } else {
        console.error('Error creating post.');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="container">
      <h1>Create a new post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Titolo:</label>
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
          <label htmlFor="content" className="form-label">Contenuto:</label>
          <textarea
            id="content"
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Crea Post</button>
      </form>
      {showSuccessAlert && (
        <div className="alert alert-success mt-3" role="alert">
          Post created successfully!
        </div>
      )}
    </div>
  );
};

export default CreatePost;
