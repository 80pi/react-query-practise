import { PostDataProps } from "./constants";

export const getUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return await res.json();
};

export const getPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return await res.json();
};

export const sendPostData = async (newData: PostDataProps) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(newData),
    headers: {
      "Content-type": "application/json; charset=UTF-8", // if we won't give this we are getting only the user id like a success response if we are giving this like this we cn see the response what we send on payload
    },
  });
  return await res.json();
};
