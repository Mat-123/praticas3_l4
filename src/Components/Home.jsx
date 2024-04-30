import { useEffect, useState } from 'react';
import { myApiUrl } from '../baseApiUrl';
import { Link } from 'react-router-dom/dist';
import ApiKeyModal from './ApiKeyModal';
import { Button, Badge } from 'react-bootstrap';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [lastPage, setLastPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showApiKeyModal, setShowApiKeyModal] = useState(false);
    const FALLBACK_IMAGE_URL = 'https://images.unsplash.com/photo-1714300236985-373d885aab6c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';


    useEffect(() => {
        const apiKey = localStorage.getItem('apiKey');
        if (!apiKey) {
          setShowApiKeyModal(true);
        }
      }, []);
    
      const handleCloseApiKeyModal = () => {
        setShowApiKeyModal(false);
      };

    useEffect(() => {
        fetch(`${myApiUrl}/posts?page=${currentPage}`)
            .then((res) => {
                setLastPage(parseInt(res.headers.get('X-WP-TotalPages')));
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setPosts(data);
            });
    }, [currentPage]);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    function generatePaginationArray() {
        let paginationArr = [];
        for (let index = 1; index <= lastPage; index++) {
            paginationArr.push({
                n: index,
                active: currentPage === index,
            });
        }
        return paginationArr;
    }

    return (
        <>
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
  Per via dei plugin che ho installato, il contenuto della response e' diversa rispetto a quella mostrata a lezione. Tra i file allego una copia della response generata dal mio sito.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Chiudi"></button>
</div>

            <div class="container-fluid overflow-hidden text-center">
  <div class="row">
                {posts.map((post) => (
                    <div className="col-lg-4 col-md-6 col-xs-12 g-3" key={post.id}>
                        <div className="position-relative">
                    <div className="card mt-3">
                    <span className="badge rounded-pill text-bg-primary position-absolute top-0 start-0 m-2">{post.yoast_head_json.schema['@graph'][0].articleSection[0] ? `${post.yoast_head_json.schema['@graph'][0].articleSection[0]}` : ''}</span>
                        <img src={post.yoast_head_json.schema['@graph'][0]?.thumbnailUrl ? post.yoast_head_json.schema['@graph'][0].thumbnailUrl : FALLBACK_IMAGE_URL} style={{ maxHeight: "200px" }} alt="immagine del post" class="card-img-top object-fit-cover"/>
                        <div className="card-body">
                        <h5 className="card-title">
                        {post.title.rendered}
                        </h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">{post.yoast_head_json.author ? `Autore: ${post.yoast_head_json.author}` : ''}</h6>
                        <Link to={`/posts/${post.id}`}>
                            <Button variant="primary mt-2">Leggi Articolo</Button>
                        </Link>
                    </div>
                    </div>
                    </div>
                    </div>
                ))}
            </div>
</div>
                <div className='d-flex justify-content-center mt-3'>
            <nav>
                <ul className="pagination">
                    <li
                        className={`page-item ${
                            currentPage === 1 && 'disabled'
                        }`}
                    >
                        <span
                            className="page-link"
                            onClick={() =>
                                currentPage !== 1 && changePage(currentPage - 1)
                            }
                        >
                            &laquo;
                        </span>
                    </li>

                    {generatePaginationArray().map((page) => (
                        <li
                            key={page.n}
                            className={`page-item ${page.active && 'active'}`}
                        >
                            <span
                                className="page-link"
                                onClick={() => changePage(page.n)}
                            >
                                {page.n}
                            </span>
                        </li>
                    ))}

<li
    className={`page-item ${
        currentPage === lastPage && 'disabled'
    }`}
>
    <span
        className="page-link"
        onClick={() =>
            currentPage !== lastPage &&
            changePage(currentPage + 1)
        }
    >
        &raquo;
    </span>
</li>
                </ul>
            </nav></div>
            <ApiKeyModal show={showApiKeyModal} handleClose={handleCloseApiKeyModal} />

        </>
    );
};

export default Home;
