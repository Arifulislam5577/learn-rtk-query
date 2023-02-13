import React from "react";
import FormCom from "../components/FormCom";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../features/api/apiSlice";

const Home = () => {
  const { isError, isLoading, data } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  return (
    <section className="py-5">
      <div className="container grid grid-cols-4 gap-5">
        <div className="col-span-3 flex flex-col gap-3">
          {isLoading ? (
            <h1>Loading...</h1>
          ) : isError ? (
            <h1>Something Went Wrong</h1>
          ) : (
            data?.map((user) => (
              <div
                key={user._id}
                className="p-5 bg-orange-50 flex items-center justify-between text-sm"
              >
                <div className="flex items-center justify-between gap-5">
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <p
                    className={`${
                      user.status ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {user.status ? "Active" : "InActive"}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-5">
                  <button
                    className="text-red-500"
                    onClick={() => updateUser(user._id)}
                  >
                    Status
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="col-span-1">
          <div className="bg-orange-50 px-5 py-8">
            <FormCom />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
