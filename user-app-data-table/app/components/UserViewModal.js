"use client";

export default function UserViewModal({
  user,
  onClose
}) {
  if (!user) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            User Details
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>

        </div>

        <div className="space-y-4">

          <div>
            <p className="text-sm text-gray-500">
              ID
            </p>

            <p className="font-medium">
              {user.id}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Name
            </p>

            <p className="font-medium">
              {user.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="font-medium">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Phone
            </p>

            <p className="font-medium">
              {user.phone}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              City
            </p>

            <p className="font-medium">
              {user.city}
            </p>
          </div>

        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-gray-800 py-2 text-white hover:bg-gray-900"
        >
          Close
        </button>

      </div>

    </div>
  );
}