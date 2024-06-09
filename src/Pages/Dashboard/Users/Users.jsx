import React, { useState } from "react";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Users = () => {
  const [userType, setUserType] = useState("all");
  const [userRole, setUserRole] = useState("Change Status");
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", userType],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/all/${userType}`);
      console.log(res, "response of users");
      return res.data;
    },
  });

  const handleRoleChange = (newRole, id) => {
    axiosSecure.put(`/users/targetUser/${id}`, { newRole }).then((res) => {
      console.log(res, "update user role");
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Role has been changed",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };
  return (
    <div>
      <SectionTitle
        heading={"All Users"}
        subHeading={"Get users by role"}
      ></SectionTitle>
      <div className="flex items-center justify-end">
        <h3 className="text-base ">User Type :</h3>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="m-1 w-28 btn">
            {userType.toUpperCase()}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button onClick={() => setUserType("all")}>All</button>
            </li>
            <li>
              <button onClick={() => setUserType("user")}>User</button>
            </li>
            <li>
              <button onClick={() => setUserType("pro-user")}>Pro User</button>
            </li>
            <li>
              <button onClick={() => setUserType("admin")}>Admin</button>
            </li>
          </ul>
        </div>
      </div>
      <div>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center">
            Something went wrong.
          </div>
        ) : users.length == 0 ? (
          <div className="flex items-center justify-center">No data found.</div>
        ) : (
          <div className="mt-5 overflow-y-auto h-[60vh] overflow-x-hidden rounded-lg">
            <table className="table ">
              {/* head */}
              <thead className="bg-[#007BFF] text-white font-bold text-xl rounded-lg">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr className="">
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="font-bold">{user.name}</div>
                      </div>
                    </td>
                    <td>
                      <p>{user.email}</p>
                    </td>
                    <td>{user.role.toUpperCase()}</td>
                    <td>
                      <div className="dropdown">
                        <div
                          tabIndex={0}
                          role="button"
                          className="m-1 w-28 btn"
                        >
                          {userRole}
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          <li>
                            <button
                              onClick={() => handleRoleChange("user", user._id)}
                            >
                              User
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() =>
                                handleRoleChange("pro-user", user._id)
                              }
                            >
                              Pro User
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() =>
                                handleRoleChange("admin", user._id)
                              }
                            >
                              Admin
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
