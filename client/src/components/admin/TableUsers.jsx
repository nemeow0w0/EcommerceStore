import React, { useEffect, useState } from "react";
import { UserCheck, UserX } from "lucide-react";
import { listAllUsers, changeStatusUsers, changeRoleUsers } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { DateFormat } from "../../utils/FormatDate";
import { toast } from "react-toastify";

const TableUsers = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleListUsers(token);
  }, []);

  const handleListUsers = (token) => {
    listAllUsers(token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeStatus = (userId, userStatus) => {
    const value = { id: userId, enabled: !userStatus };
    changeStatusUsers(token, value)
      .then(() => {
        handleListUsers(token);
        toast.success("Status changed successfully");
      })
      .catch((err) => console.log(err));
  };

  const handleChangeRole = (userId, userRole) => {
    const value = { id: userId, role: userRole };
    changeRoleUsers(token, value)
      .then(() => {
        handleListUsers(token);
        toast.success("Role changed successfully");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        User Management
      </h1>

      <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3 text-left">No.</th>
            <th className="px-4 py-3 text-left">Created</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((u, i) => (
            <tr
              key={u.id}
              className="border-t hover:bg-gray-50 transition-all duration-200"
            >
              <td className="px-4 py-3">{i + 1}</td>
              <td className="px-4 py-3 text-gray-500">{DateFormat(u.createdAt)}</td>
              <td className="px-4 py-3 text-gray-700">{u.email}</td>

              <td className="px-4 py-3">
                <select
                  onChange={(e) => handleChangeRole(u.id, e.target.value)}
                  value={u.role}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>

              <td className="px-4 py-3">
                {u.enabled ? (
                  <span className="text-green-600 font-medium">Enabled</span>
                ) : (
                  <span className="text-red-500 font-medium">Disabled</span>
                )}
              </td>

              <td className="px-4 py-3 flex gap-2">
                <button
                  onClick={() => handleChangeStatus(u.id, u.enabled)}
                  className={`px-4 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                    u.enabled
                      ? "bg-gray-800 text-white hover:bg-gray-700"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {u.enabled ? (
                    <span className="flex items-center gap-1">
                      <UserX size={16} /> Disable
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <UserCheck size={16} /> Enable
                    </span>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUsers;
