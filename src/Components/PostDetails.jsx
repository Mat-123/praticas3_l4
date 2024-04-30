import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { myApiUrl } from '../baseApiUrl';
import Sidebar from './Sidebar';

const PostDetails = () => {
    const [post, setPost] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        fetch(`${myApiUrl}/posts/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPost(data);
            });
    }, [id]);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        post && (
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-xs-12 mx-auto mt-3" key={post.id}>
                        <h1>{post.title.rendered}</h1>
                        <h3 className='text-secondary'>{post.yoast_head_json.description}</h3>
                        <hr />
                        <div className="d-flex flex-row justify-content-between">
                            <div className="flex-column">
                                <p className='mb-0 fs-5'>Scritto da: {post.yoast_head_json.author}</p>
                                <span className='mb-0 fs-6'>Pubblicato in: {post.yoast_head_json.schema['@graph'][0].articleSection[0]} · Tempo di lettura stimato: {post.yoast_head_json.twitter_misc["Tempo di lettura stimato"]}</span>
                            </div>
                            <div className="flex-column">
                                <button type="button" class="btn btn-primary" onClick={toggleSidebar}>Gestisci Post</button>
                            </div>
                        </div>
                        <hr />
                        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
                    </div>
                </div>
                <Sidebar postId={id} showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            </div>
        )
    );
};

export default PostDetails;