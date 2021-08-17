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
      const data = await axios.get("http://localhost:3001/postlist");
      setFetchedData(data);
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
    await axios.post("http://localhost:3001/post", newPost);
    setPostTitle("");
    setPostDescription("");
    setListUpdated(false);
  };

  const handleUpvotePost = async (postIndex) => {
    setListUpdated(true);
    const correctPostId = fetchedData.data[postIndex]._id;
    await axios.post(`http://localhost:3001/upvote/${correctPostId}`);
    console.log("correctPost: ", correctPostId);
    setListUpdated(false);
  };

  const handleDownvotePost = async (postIndex) => {
    setListUpdated(true);
    const correctPostId = fetchedData.data[postIndex]._id;
    await axios.post(`http://localhost:3001/downvote/${correctPostId}`);
    console.log("correctPost: ", correctPostId);
    setListUpdated(false);
  };

  const handleClickDeletePost = async (postIndex) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setListUpdated(true);
      const correctPostId = fetchedData.data[postIndex]._id;
      await axios.delete(`http://localhost:3001/post/delete/${correctPostId}`);
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
        <div className="flex flex-col items-center ">
          <div className="flex flex-col items-start border-2 border-gray-600 rounded p-2 m-2 w-80 bg-gray-800 lg:w-3/4 lg:items-center">
            <div className="px-4">
              <div>
                <div className="text-white">Title</div>
                <input
                  type="text"
                  value={postTitle}
                  onChange={handleFirstNameChange}
                  size="32"
                />
              </div>
              <div>
                <div className="text-white">Description</div>
                <textarea
                  type="text"
                  value={postDescription}
                  onChange={handleLastNameChange}
                  className="h-40"
                  cols="35"
                />
              </div>
            </div>
            <div>
              <button
                onClick={addPostHandler}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-3"
              >
                Add new post
              </button>
            </div>
          </div>
        </div>
        {/*         <CreatePost
          postTitle={postTitle}
          handleFirstNameChange={handleFirstNameChange}
          postDescription={postDescription}
          handleLastNameChange={handleLastNameChange}
          addPostHandler={addPostHandler}
        /> */}
        {/*         <PostList
          fetchedData={fetchedData}
          handleClickDeletePost={handleClickDeletePost}
          handleUpvotePost={handleUpvotePost}
          handleDownvotePost={handleDownvotePost}
        /> */}
        <div>
          {fetchedData.data ? (
            <div className="flex flex-col items-center ">
              {fetchedData.data.map((post, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col border-2 border-gray-600 rounded p-2 m-2 w-80 bg-gray-800 text-white lg:w-3/4"
                  >
                    <div className="flex justify-between">
                      <div className="font-bold text-xl mb-2">{post.title}</div>
                      <button onClick={() => handleClickDeletePost(index)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="">{post.description}</div>
                    <div className="">{post.createdTime}</div>
                    <div className="">
                      {`Votes: 
                      ${post.votes}`}
                    </div>
                    <div className="flex">
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2"
                        onClick={() => handleUpvotePost(index)}
                      >
                        Upvote
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2"
                        onClick={() => handleDownvotePost(index)}
                      >
                        Downvote
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
