import { useQuery, Mutation } from "@tanstack/react-query";
import { useState } from "react";
import { getUsers } from "../utils/utils";
import { UserDataProps } from "../utils/constants";

const Users = () => {
  const [userSelection, setUserSelection] = useState({
    userClick: false,
    postClick: false,
  });
  const { data, isLoading, isError } = useQuery({
    // use query used for the get request
    queryKey: ["users"],
    queryFn: getUsers,
    retry: 4, // it will try for given n number of times
    refetchOnWindowFocus: false, // make the query not to make any call on again focus on window
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
        <h3>posts</h3>
      </>
    );
  };

  if (isError) {
    <h2>Error while calling</h2>;
  }
  if (isLoading) <h3>Data Loading</h3>;
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
