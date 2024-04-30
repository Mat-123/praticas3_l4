import React from 'react';
import { myApiUrl } from '../baseApiUrl';
import { Link } from 'react-router-dom';

const Sidebar = ({ postId, showSidebar, setShowSidebar }) => {
  const deletePost = (postId) => {
const apiKey = localStorage.getItem('apiKey');
const user = localStorage.getItem('user')
const authString = btoa(`${user}:${apiKey}`);

    fetch(`${myApiUrl}/posts/${postId}`, {
        headers: {
            Authorization: `Basic ${authString}`,
        },
        method: 'DELETE',
    }).then((res) => {
        if (res.ok) {
            console.log('Post deleted successfully.');
            window.location.replace('/');
        }
        else if (res.status === 401) {
            console.error('Unauthorized: Please check your API key.');
        }
    }).catch(error => {
        console.error('Error deleting post:', error);
    });
  };

  const handleDeletePost = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      deletePost(postId);
    }
  };

  return (
    <div className={`offcanvas offcanvas-start${showSidebar ? ' show' : ''}`} tabIndex="-1" id="sidebarOffcanvas" aria-labelledby="sidebarOffcanvasLabel">
        <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="sidebarOffcanvasLabel">Menu laterale</h5>
            <button type="button" className="btn-close text-reset" onClick={() => setShowSidebar(false)} aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
            <h2>Gestisci gli articoli</h2>
            <Link to="/create-post">
          <button type="button" className="btn btn-success mt-3">Crea un nuovo articolo</button>
        </Link>
        <Link to={`/edit-post/${postId}`}>
          <button type="button" className="btn btn-warning mt-3">Modifica questo articolo</button>
        </Link>
            <button type="button" class="btn btn-danger mt-3" onClick={handleDeletePost}>Cancella questo articolo</button>
            
        </div>
    </div>
  );
};

export default Sidebar;
