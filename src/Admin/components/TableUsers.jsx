import React from "react";

function TableUsers({ users, loading, currentPage, limit }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-100 text-gray-500 text-left">
          <tr>
            <th className="px-3 py-2 border border-gray-300">No</th>
            <th className="px-3 py-2 border border-gray-300">Username</th>
            <th className="px-3 py-2 border border-gray-300">Email</th>
            <th className="px-3 py-2 border border-gray-300">Role</th>
            <th className="px-3 py-2 border border-gray-300">Joined</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center py-6">
                Loading....
              </td>
            </tr>
          ) : users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index} className="">
                <td className="px-3 py-2 border border-gray-300">
                  {(currentPage - 1) * limit + (index + 1)}
                </td>
                <td className="px-3 py-2 border border-gray-300 capitalize">
                  {user.username}
                </td>
                <td className="px-3 py-2 border border-gray-300">
                  {user.email}
                </td>
                <td className="px-3 py-2  border border-gray-300 font-medium">
                  {user.role}
                </td>
                <td className="px-3 py-2 border border-gray-300">
                  {formatDate(user.createdAt)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-6">
                User Not Available Yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableUsers;
