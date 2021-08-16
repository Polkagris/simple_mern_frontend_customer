import React from "react";

function CreatePost({
  postTitle,
  handleFirstNameChange,
  postDescription,
  handleLastNameChange,
  addPostHandler,
}) {
  return (
    <div className="flex flex-col items-center ">
      <div className="flex flex-col items-start border-2 border-gray-600 rounded p-2 m-2 w-80 bg-gray-800">
        <div className="px-4">
          <div>
            <div className="text-white">Title</div>
            <input
              type="text"
              value={postTitle}
              onChange={handleFirstNameChange}
              size="20"
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
  );
}

export default CreatePost;
