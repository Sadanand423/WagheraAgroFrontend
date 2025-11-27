import React, { useState } from "react";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [childAge, setChildAge] = useState("");
  const [selectedRooms, setSelectedRooms] = useState(null);
  const [showRoomSelection, setShowRoomSelection] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkIn || !checkOut || !adults || children === "") {
      setError("All fields are required.");
      return;
    }

    if (Number(children) > 0 && !childAge) {
      setError("Please enter the age of the child/children.");
      return;
    }

    setError("");
    setShowRoomSelection(true);
  };

  const handleRoomClick = (num) => {
    setSelectedRooms(num);

    // Navigate to Rooms page and pass search data
    navigate("/room-detail", {
      state: {
        checkIn,
        checkOut,
        adults,
        children,
        childAge,
        rooms: num,
      },
    });
  };

  return (
    <div className="px-2 sm:px-4 lg:px-6">
      {!showRoomSelection ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-[20px] px-6 py-6 w-full max-w-[1330px] mx-auto flex flex-col md:flex-row md:items-center gap-6 md:gap-5"
        >
          {/* Check In */}
          <div className="w-full md:w-auto flex-1">
            <label className="block text-base font-medium text-gray-800 mb-1">Check In</label>
            <div className="flex items-center gap-2 text-gray-700 border border-gray-200 px-3 py-2 rounded-md">
              <FaCalendarAlt />
              <input
                type="date"
                className="bg-transparent outline-none w-full"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Check Out */}
          <div className="w-full md:w-auto flex-1">
            <label className="block text-base font-medium text-gray-800 mb-1">Check Out</label>
            <div className="flex items-center gap-2 text-gray-700 border border-gray-200 px-3 py-2 rounded-md">
              <FaCalendarAlt />
              <input
                type="date"
                className="bg-transparent outline-none w-full"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Adults */}
          <div className="w-full md:w-auto flex-1">
            <label className="block text-base font-medium text-gray-800 mb-1">Adult</label>
            <div className="flex items-center gap-2 text-gray-700 border border-gray-200 px-3 py-2 rounded-md">
              <FaUser />
              <select
                className="bg-transparent outline-none w-full"
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                required
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} Person{num > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Children */}
          <div className="w-full md:w-auto flex-1">
            <label className="block text-base font-medium text-gray-800 mb-1">Child</label>
            <div className="flex items-center gap-2 text-gray-700 border border-gray-200 px-3 py-2 rounded-md">
              <FaUser />
              <select
                className="bg-transparent outline-none w-full"
                value={children}
                onChange={(e) => setChildren(e.target.value)}
                required
              >
                <option value="">Select</option>
                {[0, 1, 2, 3].map((num) => (
                  <option key={num} value={num}>
                    {num} Child{num !== 1 ? "ren" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Child Age */}
          {Number(children) > 0 && (
            <div className="w-full md:w-auto flex-1">
              <label className="block text-base font-medium text-gray-800 mb-1">Child Age</label>
              <div className="flex items-center gap-2 text-gray-700 border border-gray-200 px-3 py-2 rounded-md">
                <input
                  type="number"
                  min="0"
                  max="17"
                  className="bg-transparent outline-none w-full"
                  value={childAge}
                  onChange={(e) => setChildAge(e.target.value)}
                  placeholder="Enter age"
                />
              </div>
            </div>
          )}

          {/* Search Button */}
          <div className="w-full md:w-auto">
            <button
              type="submit"
              className="w-full md:w-auto bg-[#a8815e] text-white font-serif mt-6 px-6 py-3 rounded-md hover:bg-[#916c49] transition-all"
            >
              Search
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="w-full text-red-600 text-center text-sm col-span-full mt-2">
              {error}
            </div>
          )}
        </form>
      ) : (
        // Simple Rooms selection step
        <div className="bg-white shadow-xl rounded-[20px] px-6 py-8 w-full max-w-[600px] mx-auto text-center">
          <h2 className="text-2xl font-serif text-gray-800 mb-3">Select Number of Rooms</h2>
          <p className="text-gray-600 mb-6">Choose how many rooms you want to book</p>

          <div className="flex justify-center gap-4 mb-6">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleRoomClick(num)}
                className="px-6 py-3 rounded-lg bg-[#f6efe7] text-gray-800 hover:bg-[#a8815e] hover:text-white font-medium transition-all"
              >
                {num} Room{num > 1 ? "s" : ""}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="mt-4 text-sm text-gray-500 underline"
            onClick={() => setShowRoomSelection(false)}
          >
            Change search details
          </button>
        </div>
      )}
    </div>
  );
};

export default Booking;
