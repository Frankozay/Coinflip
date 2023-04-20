import React, { useState } from "react";

interface UsernameDialogProps {
  open: boolean;
  onSubmit: (username: string) => void;
}

const UsernameDialog: React.FC<UsernameDialogProps> = ({ open, onSubmit }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (username.trim() === "") {
      setError(true);
    } else {
      setError(false);
      onSubmit(username);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setError(false);
  };

  return (
    <>
      {open && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
          <div className="fixed z-20 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white w-full max-w-md mx-auto rounded shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-blue-900 mr-4">
                    Create Username:
                  </h2>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    className={`flex-grow px-4 py-2 border ${
                      error ? "border-red-500" : "border-blue-300"
                    } rounded focus:outline-none focus:border-blue-500 text-sm`}
                    value={username}
                    onChange={handleInputChange}
                  />
                </div>
                {error && (
                  <div className="text-red-500 text-xs mb-4">
                    Username cannot be empty.
                  </div>
                )}
                <div className="flex justify-end">
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UsernameDialog;
