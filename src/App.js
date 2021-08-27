import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";

function App() {
  const [fetchedData, setFetchedData] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [listUpdated, setListUpdated] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        "https://posts-node-express-api.herokuapp.com/postlist"
      );
      setFetchedData(data.data.reverse());
    };
    getData();
  }, [listUpdated]);

  console.log("data: ", fetchedData);

  const handleFirstNameChange = (e) => {
    setPostTitle(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setPostDescription(e.target.value);
  };

  const addPostHandler = async () => {
    setListUpdated(true);
    const newPost = {
      title: postTitle,
      description: postDescription,
    };
    await axios.post(
      "https://posts-node-express-api.herokuapp.com/post",
      newPost
    );
    setPostTitle("");
    setPostDescription("");
    setListUpdated(false);
  };

  const handleUpvotePost = async (postIndex) => {
    setListUpdated(true);
    const correctPostId = fetchedData[postIndex]._id;
    await axios.post(
      `https://posts-node-express-api.herokuapp.com/upvote/${correctPostId}`
    );
    console.log("correctPost: ", correctPostId);
    setListUpdated(false);
  };

  const handleDownvotePost = async (postIndex) => {
    setListUpdated(true);
    const correctPostId = fetchedData[postIndex]._id;
    await axios.post(
      `https://posts-node-express-api.herokuapp.com/${correctPostId}`
    );
    console.log("correctPost: ", correctPostId);
    setListUpdated(false);
  };

  const handleClickDeletePost = async (postIndex) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setListUpdated(true);
      const correctPostId = fetchedData[postIndex]._id;
      await axios.delete(
        `https://posts-node-express-api.herokuapp.com/post/delete/${correctPostId}`
      );
      console.log("correctPost: ", correctPostId);
      setListUpdated(false);
    } else {
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center py-0">
      <nav className="p-6 w-full bg-black">
        <div className="text-white font-bold">Awesome Posts</div>
      </nav>
      <div className="h-0.5 bg-red-700 w-full"></div>
      <div className="text-white">New Post</div>
      <div className="border-2 border-gray-600 rounded p-2 w-96 bg-black lg:w-3/4">
        <CreatePost
          postTitle={postTitle}
          handleFirstNameChange={handleFirstNameChange}
          postDescription={postDescription}
          handleLastNameChange={handleLastNameChange}
          addPostHandler={addPostHandler}
        />
        <PostList
          fetchedData={fetchedData}
          handleClickDeletePost={handleClickDeletePost}
          handleUpvotePost={handleUpvotePost}
          handleDownvotePost={handleDownvotePost}
        />
      </div>
    </div>
  );
}

export default App;
