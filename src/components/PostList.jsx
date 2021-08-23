import React from "react";

function PostList({
  fetchedData,
  handleClickDeletePost,
  handleUpvotePost,
  handleDownvotePost,
}) {
  return (
    <div>
      {fetchedData ? (
        <div className="flex flex-col items-center ">
          {fetchedData.map((post, index) => {
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
  );
}

export default PostList;
