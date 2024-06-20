import { useQuery } from "@tanstack/react-query";
import { CiTrash } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import SectionTitle from "../../../../components/sectionHeading/SectionTitle";
import useAxiosSecure from "../../../../hooks/axios/useAxiosSecure";
import useAuth from "../../../../hooks/auth/useAuth";

const Users = () => {
  const {user:currentUser}=useAuth()
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/users/?email=${currentUser.email}`);
      return result.data;
    },
  });

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(user._id);
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.acknowledged) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${user.name} has been deleted`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${user.name} make admin`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const addRole = { role: "admin" };
        axiosSecure.patch(`/users/${user._id}`, addRole).then((res) => {
          if (res.data.acknowledged) {
            refetch();
            Swal.fire({
              title: "Admin!",
              text: `${user.name} is now admin`,
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <section>
      <SectionTitle
        title="MANAGE ALL USERS"
        subtitle="---How many??---"
      ></SectionTitle>
      <div className="overflow-x-auto bg-white p-8 mx-8">
        <h2 className="text-2xl font-bold">Total users: {users.length}</h2>
        <table className="table mt-10">
          {/* head */}
          <thead className="bg-[#D1A054]">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <h4>{user.name}</h4>
                </td>
                <td>
                  <h4>{user.email}</h4>
                </td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-warning btn-md"
                    >
                      <FaUsers className="text-white text-3xl" />
                    </button>
                  )}
                </td>
                <th>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-error btn-md"
                  >
                    <CiTrash className="text-white text-3xl" />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Users;
