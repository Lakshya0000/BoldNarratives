import React, { useEffect, useState } from 'react';
import { BlogCard } from '../components/BlogCard';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import LoadingBlogs from '../components/LoadingBlogs';
const HomePage = () => {

    const [blogs, setBlogs] = useState({
        id: '',
        title: '',
        views: '',
        vote: '',
        author: {

            name: ''

        }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/blog/all`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs({
                    id: response.data.id,
                    title: response.data.title,
                    views: response.data.views,
                    vote: response.data.views,
                    author: {

                        name: response.data.name

                    }
                })
                setLoading(false);
            })
    }, [])
    return (

        <div>
            <div className=' w-screen h-28 bg-custom-teal'>
                <div className='absolute top-2 left-0 flex flex-row items-center justify-center'>

                    <img src=" /blog2.png" alt="" className='w-28' />
                    <div className='text-white text-3xl font-bold font-sans -ml-5'>Bold Narratives</div>
                </div>
            </div>
            <div>
                {loading && <div><LoadingBlogs /></div>}
                {!loading && <div> {blogs.map(blog => <BlogCard
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"2nd Feb 2024"}
                />)}</div>}
            </div>

        </div>
    );
}

export default HomePage;
