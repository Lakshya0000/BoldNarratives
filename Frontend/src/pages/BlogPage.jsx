import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';

const BlogPage = () => {
    const [blog,setBlog]=useState({});
    const [loading,setLoading]=useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [comment,setComment]=useState("");
    const [check,setCheck] = useState(true);
    useEffect(() => {
        setLoading(true);
        console.log(id)
        axios.get(`${BACKEND_URL}/api/blog/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            if (response.status === 404) {
                navigate("/home");
            } else {
                const getBlog = response.data.blog
                setBlog({...getBlog,name : getBlog.author.name,votes : getBlog._count.votes,comments : getBlog.comments }); // Ensure blog is set as an empty object if undefined
                setLoading(false);
            }
            }).catch((err)=>{
                navigate("/home")
            })
        
    },[check])
    const commentBody = {
        comment,
        BlogId : parseInt(id)
    }
    const handleComment=()=>{
        console.log(commentBody)
        axios.post(`${BACKEND_URL}/api/blog/comment`,commentBody,{
            headers: {
                'Content-Type':'application/json',
                Authorization: localStorage.getItem("token")
            },
        }).then(response=>{
            setComment("");
            console.log("Succesfully addded comment")
            return response.data
        }).catch((e)=>{
            console.log(e)
        })
        setCheck(!check)
        }
    return (
        <div>
            <Navbar/>
            {/* <Blog id={blog?.id}
                content={blog?.content}
                authorName={blog?.name}
                title={blog?.title}
                genre={blog?.genre}
                publishedDate={blog?.createdAt}
                views={blog?.views}
                votes={blog?.votes}
                comments={blog?.comments} 
            /> */}
            <div>
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-12">
                    <div className="col-span-8">
                        <div className="text-5xl font-extrabold">
                            {blog?.title}
                        </div>
                        <div className="text-slate-500 pt-2">
                            {`Post on ${new Date(blog?.createdAt).toLocaleDateString()}`}
                        </div>
                        <div className="pt-4">
                            {blog?.content}
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="text-slate-600 text-lg">
                            Author
                        </div>
                        <div className="flex w-full">
                            <div className="pr-4 flex flex-col justify-center">
                                {/* Add author avatar or initials here if available */}
                            </div>
                            <div>
                                <div className="text-xl font-bold">
                                    {blog?.name || 'Anonymous'}
                                </div>
                                <div className="pt-2 text-black">
                                    {blog?.genre}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div className="flex justify-center mt-10">
                <div className="w-full max-w-screen-xl">
                    <div className="text-2xl font-bold mb-4">Comments ({blog?.comments?.length})</div>
                    <div className='flex flex-row items-center'>
                    <input type="text" className='w-1/2 border h-10 flex justify-start items-start px-2' value={comment} onChange={(e)=>{setComment(e.target.value)}} />
                    <button onClick={handleComment} className='px-3 bg-custom-teal'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
                        <path d="M 5.4453125 4.0019531 A 1.50015 1.50015 0 0 0 4.109375 6.0644531 L 11.380859 24 L 4.109375 41.935547 A 1.50015 1.50015 0 0 0 6.1699219 43.841797 L 43.169922 25.341797 A 1.50015 1.50015 0 0 0 43.169922 22.658203 L 6.1699219 4.1582031 A 1.50015 1.50015 0 0 0 5.4453125 4.0019531 z M 8.3828125 8.6191406 L 39.146484 24 L 8.3828125 39.380859 L 14.011719 25.5 L 27.5 25.5 A 1.50015 1.50015 0 1 0 27.5 22.5 L 14.011719 22.5 L 8.3828125 8.6191406 z"></path>
                    </svg>
                    </button>
                    </div>
                    {blog?.comments && blog?.comments.length > 0 ? (
                        blog?.comments.map((comment, index) => (
                            <div key={index} className="mb-4 p-4 border rounded-lg">
                                {console.log(comment)}
                                <div className="text-lg font-semibold">{comment.author.name}</div>
                                <div className="text-slate-600">{comment.comment}</div>
                            </div>
                        ))
                    ) : (
                        <div className="text-slate-500">No comments yet. Be the first to comment!</div>
                    )}
                </div>
            </div>
        </div>
        </div>
    );
}

export default BlogPage;
