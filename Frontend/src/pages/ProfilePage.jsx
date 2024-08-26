import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

const UserProfile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch user data and follow status
    axios.get(`${BACKEND_URL}/api/user/view/${userId}`)
      .then((response) => {
        setUserData(response.data);
        setBlogs(response.data.blogs);
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, [userId]);

  const handleFollow = () => {
    axios.post(`${BACKEND_URL}/api/user/follow`)
      .then(() => setIsFollowing(true))
      .catch((error) => console.error('Error following user:', error));
  };

  const handleUnfollow = () => {
    axios.post(`/api/user/${userId}/unfollow`)
      .then(() => setIsFollowing(false))
      .catch((error) => console.error('Error unfollowing user:', error));
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h1>{userData.name}</h1>
        <p>{userData.email}</p>
        <div>
          <span>{userData.followersCount} Followers</span>
          <span>{userData.followingCount} Following</span>
        </div>
        {isFollowing ? (
          <button onClick={handleUnfollow} className="btn-unfollow">
            Unfollow
          </button>
        ) : (
          <button onClick={handleFollow} className="btn-follow">
            Follow
          </button>
        )}
      </div>
      <div className="user-blogs">
        <h2>{userData.name}'s Blogs</h2>
        {blogs.length > 0 ? (
          <ul>
            {blogs.map((blog) => (
              <li key={blog.id}>
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <span>Views: {blog.views}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No blogs yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
