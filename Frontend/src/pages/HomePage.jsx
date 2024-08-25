import React, { useEffect, useState } from 'react';
import { BlogCard } from '../components/BlogCard';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import LoadingBlogs from '../components/LoadingBlogs';
import DropdownWithSearch from '../components/Dropdown';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const navigate=useNavigate();
    const skipPages= (page-1)*10;
    const genre={
        genre:"all",
        skip:skipPages
    }
    useEffect(() => {
        axios.post(`${BACKEND_URL}/api/blog/sort/views`, genre,{
            
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data)
                setLoading(false);
            })
            .catch(err => {
                if (err.response && err.response.status === 403) {
                    // Handle 403 Forbidden by setting an error state
                    setError('Unauthorized access. You do not have permission to view this page.');
                    navigate('/signin');
                } else {
                    // Handle other errors
                    setError('An unexpected error occurred.');
                    navigate('/signin');

                }
                setLoading(false);
            });
    }, [page])
    useEffect(() => {
        axios.post(`${BACKEND_URL}/api/blog/total`,genre, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                const totalPages=Math.ceil(response.data.total/10);
                setTotalPages(Math.max(totalPages, 1))
                setLoading(false);
            })
            .catch(err => {
                if (err.response && err.response.status === 403) {
                    // Handle 403 Forbidden by setting an error state
                    setError('Unauthorized access. You do not have permission to view this page.');
                    navigate('/signin');
                } else {
                    // Handle other errors
                    setError('An unexpected error occurred.');
                    navigate('/signin');

                }
                setLoading(false);
            });
    }, [])
    
    return (

        <div>
            <div className=' w-screen h-28 bg-custom-teal'>
                <div className='absolute top-2 left-0 flex flex-row items-center justify-center'>

                    <img src=" /blog2.png" alt="" className='w-28' />
                    <div className='text-white text-3xl font-bold font-sans -ml-5'>Bold Narratives</div>
                </div>
                <div className='w-full h-28 flex items-center justify-center'>
                     <DropdownWithSearch/>
                    <input type="text" className=' p-2 w-2/5 ' placeholder='Search...'/>
                </div>
            </div>
            <div>
                {loading && <div className='w-screen flex justify-between flex-col items-center'><LoadingBlogs /><LoadingBlogs /><LoadingBlogs /><LoadingBlogs /></div>}
                {!loading && <div> {blogs.map(blog => <BlogCard
                    key={blog.id}
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    publishedDate={blog.createdAt}
                    genre={blog.genre}
                    views={blog.views}
                    votes={blog.votes}
                />)}</div>}
            </div>
            {!loading&&<div>
                <div className='flex justify-center items-center w-screen'>
            <div className="flex justify-between my-10 w-1/2 items-center">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className=" py-2 bg-custom-teal text-white rounded-md w-24 font-bold hover:cursor-pointer"
                >
                    Previous
                </button>
                <span className="font-bold">Page {page} of {totalPages}</span>
                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className=" py-2 bg-custom-teal text-white font-bold rounded-md w-24 hover:cursor-pointer"
                >
                    Next
                </button>
            </div>
            </div>
            </div>}
        </div>
    );
}

export default HomePage;
