"use client";

import { TrashIcon } from "@heroicons/react/24/outline";

export default function DeleteButton({
  id,
  apiPath = "/api/", // default API route
  redirectTo = "/", // where to go after deletion
  confirmMessage = "Are you sure you want to delete this?",
  successMessage = "Deleted successfully!",
  className = "",
}) {
  const handleDelete = async () => {
    const confirmed = confirm(confirmMessage);
    if (!confirmed) return;

    const res = await fetch(`${apiPath}/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert(successMessage);
      window.location.href = redirectTo;
    } else {
      const error = await res.json();
      alert("Failed: " + error.message);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className={`text-red-600 text-xs px-3 py-1 uppercase rounded-md cursor-pointer ${className}`}
    >
      <TrashIcon className="w-5 h-5" />
    </button>
  );
}
