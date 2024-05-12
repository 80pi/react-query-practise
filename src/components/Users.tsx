import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; // need to cross check the imports
import { useState } from "react";
import { getPosts, getUsers, sendPostData } from "../utils/utils";
import { UserDataProps, PostDataProps } from "../utils/constants";

const Users = () => {
  const [userSelection, setUserSelection] = useState({
    userClick: false,
    postClick: false,
  });
  const queryClient = useQueryClient(); // reqs for the use of query clinet

  const { data, isLoading, isError } = useQuery({
    // use query used for the get request
    queryKey: ["users"],
    queryFn: getUsers,
    retry: 4, // it will try for given n number of times
    refetchOnWindowFocus: false, // make the query not to make any call on again focus on window
  });
  const {
    data: postData,
    isLoading: postLoading,
    isError: postError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    retry: 4,
    refetchOnWindowFocus: false,
  });

  const {
    mutate,
    isError: postUpdateError,
    isPending,
  } = useMutation({
    mutationFn: (newData: PostDataProps) => sendPostData(newData),
    onSuccess: (newData) => {
      // queryClient.invalidateQueries({ queryKey: ["posts"] }); // this helps for the recalling of the post again bzc if we post the data then we need to call it for getting the latest updated data in real time projects
      queryClient.setQueryData(["posts"], (prev: any) => [...prev, newData]); // this help to append data to the variable that holds data for that query like old data + present send data this helps in not making a api call to get latest data just it will append to the data which we hold from the initial state
    },
  });

  const displayUser = () => {
    return (
      <>
        <h2>Users details using react query</h2>
        {data &&
          data.map((item: UserDataProps) => {
            const { id, name, email, phone } = item;
            return (
              <div key={id}>
                <hr />
                <h3>Name: {name}</h3>
                <h3>Email: {email}</h3>
                <h3>Phone no: {phone}</h3>
              </div>
            );
          })}
      </>
    );
  };
  const displayPost = () => {
    return (
      <>
        <h2>Post details using react query</h2>
        <button
          onClick={() =>
            mutate({
              id: 234,
              title: "Title for the new Data",
              body: "Body for the new data",
            })
          }
        >
          Click to send data
        </button>
        {postData &&
          postData.map((item: PostDataProps) => {
            const { id, title, body } = item;
            return (
              <div key={id}>
                <hr />
                <h3>Id: {id}</h3>
                <h3>Title: {title}</h3>
                <h3>Body: {body}</h3>
              </div>
            );
          })}
      </>
    );
  };

  if (isError) {
    <h2>Error while calling Users</h2>;
  }
  if (isLoading) <h3>Data users Loading... </h3>;
  if (postError || postUpdateError) {
    <h2>Error while calling Posts Api</h2>;
  }
  if (postLoading || isPending) <h3>Post Data Loading... </h3>;
  return (
    <>
      <button
        onClick={() => {
          setUserSelection({ userClick: true, postClick: false });
          // setUserSelection({ ...userSelection, userClick: true }); //both the methods will work
          // setUserSelection((prev) => ({ ...prev, userClick: true }));
        }}
      >
        User
      </button>
      <button
        onClick={() => setUserSelection({ userClick: false, postClick: true })}
      >
        Post
      </button>
      {userSelection.userClick && displayUser()}
      {userSelection.postClick && displayPost()}
    </>
  );
};
export default Users;
