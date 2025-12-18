

import React, { useEffect, useState } from "react";
import moment from "moment";

const EXTRA_SERVICES = [
  { label: "Room Clean", price: 10, unit: "/ Night" },
  { label: "Parking", price: 0, unit: "Free" },
  { label: "Airport Transport", price: 20, unit: "/ Night" },
  { label: "Pet Friendly", price: 15, unit: "/ Night" },
];

export default function BookNow() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [checkIn, setCheckIn] = useState(moment().format("YYYY-MM-DD"));
  const [checkOut, setCheckOut] = useState(moment().add(1, "days").format("YYYY-MM-DD"));
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [extraBed, setExtraBed] = useState(0);
  const [selectedExtraServices, setSelectedExtraServices] = useState([]);
  const [bookingStatus, setBookingStatus] = useState(null);

  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const selectedRoom = rooms.find((room) => room._id === selectedRoomId);
  const numNights = moment(checkOut).diff(moment(checkIn), "days");

  const calculateTotal = () => {
    const basePrice = selectedRoom ? selectedRoom.price : 0;
    const servicesPrice = selectedExtraServices.reduce((sum, label) => {
      const service = EXTRA_SERVICES.find((s) => s.label === label);
      return sum + (service ? service.price : 0);
    }, 0);
    return ((basePrice + servicesPrice) * (numNights > 0 ? numNights : 1)).toFixed(2);
  };

  useEffect(() => {
    fetch("https://backend-waghera.onrender.com/api/admin/rooms")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        if (data.length > 0) setSelectedRoomId(data[0]._id);
      })
      .catch((err) => console.error("Error fetching rooms:", err));
  }, []);

  const toggleService = (label) => {
    setSelectedExtraServices((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.id) return alert("Please log in first to book a room.");
    if (!selectedRoomId) return alert("Please select a room.");
    if (numNights < 1) return alert("Check-out must be after check-in.");

    setBookingStatus("loading");

    const bookingData = {
      userId: user.id,
      roomId: selectedRoomId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      adults: parseInt(adults),
      children: parseInt(children),
      extraBed: parseInt(extraBed),
      extraServices: selectedExtraServices,
      totalPrice: parseFloat(calculateTotal()),
    };

    try {
      const response = await fetch("https://backend-waghera.onrender.com/api/bookings/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const contentType = response.headers.get("content-type");

      if (contentType?.includes("application/pdf")) {
        const pdfBlob = await response.blob();
        const pdfURL = URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = pdfURL;
        link.download = `booking_${Date.now()}.pdf`;
        link.click();
        URL.revokeObjectURL(pdfURL);
        setBookingStatus("success");
        alert("Booking successful! PDF downloaded.");
      } else {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Booking failed");
        setBookingStatus("success");
        alert(data.message || "Booking successful!");
      }
    } catch (err) {
      console.error("Booking failed:", err);
      setBookingStatus("error");
      alert("Booking failed: " + err.message);
    }
  };

  return (
    <div className=" text-gray-800">
      {!user ? (
        <div className="text-center mt-10 text-2xl text-red-600">
          Please log in first to book a room.
        </div>
      ) : (
        <section className="bg-white px-4 py-10 md:px-24 min-h-[200vh]">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 h-[150vh] overflow-y-scroll scrollbar-hide pr-2">
              <h2 className="text-5xl text-[#af7b4f]">
                {selectedRoom ? `${selectedRoom.price} ₹ / Night` : "---"}
              </h2>
              <h1 className="text-6xl mt-5 mb-4">{selectedRoom ? selectedRoom.roomName : "Select Room"}</h1>
              <p className="text-gray-600 mb-8 text-xl">{selectedRoom?.type || "Comfortable and elegant rooms."}</p>
            </div>

            <div className="bg-gray-100 rounded-lg p-6 shadow-sm h-fit min-h-[140vh]">
              <h3 className="text-3xl text-center mb-7">Book Your Stay</h3>
              <form className="space-y-4 text-xl" onSubmit={handleSubmit}>
                {/* Check-in / Check-out */}
                <div>
                  <label>Check In</label>
                  <input
                    type="date"
                    value={checkIn}
                    min={moment().format("YYYY-MM-DD")}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full border px-3 py-2 rounded bg-white"
                  />
                </div>
                <div>
                  <label>Check Out</label>
                  <input
                    type="date"
                    value={checkOut}
                    min={moment(checkIn).add(1, "days").format("YYYY-MM-DD")}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full border px-3 py-2 rounded bg-white"
                  />
                </div>

                {/* Room Selection */}
                <div>
                  <label>Room Type</label>
                  <select
                    value={selectedRoomId}
                    onChange={(e) => setSelectedRoomId(e.target.value)}
                    className="w-full border px-3 py-2 rounded bg-white"
                  >
                    {rooms.map((room) => (
                      <option key={room._id} value={room._id}>
                        {room.roomName} — ₹{room.price}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Guests & Extra Bed */}
                <div>
                  <label>Adults</label>
                  <input type="number" min={1} value={adults} onChange={(e) => setAdults(e.target.value)} className="w-full border px-3 py-2 rounded bg-white" />
                </div>
                <div>
                  <label>Children</label>
                  <input type="number" min={0} value={children} onChange={(e) => setChildren(e.target.value)} className="w-full border px-3 py-2 rounded bg-white" />
                </div>
                <div>
                  <label>Extra Bed</label>
                  <input type="number" min={0} value={extraBed} onChange={(e) => setExtraBed(e.target.value)} className="w-full border px-3 py-2 rounded bg-white" />
                </div>

                {/* Extra Services */}
                <h4 className="text-3xl text-center mt-6 mb-4">Extra Services</h4>
                {EXTRA_SERVICES.map((s, i) => (
                  <label key={i} className="flex justify-between mt-3 text-xl">
                    <span>
                      <input
                        type="checkbox"
                        checked={selectedExtraServices.includes(s.label)}
                        onChange={() => toggleService(s.label)}
                        className="mr-2"
                      />
                      {s.label}
                    </span>
                    <span>{s.price > 0 ? `₹${s.price}${s.unit}` : s.unit}</span>
                  </label>
                ))}

                {/* Total & Submit */}
                <div className="flex justify-between mt-6 text-2xl border-t pt-4">
                  <span>Total Price</span>
                  <span className="text-[#af7b4f] font-bold">₹{calculateTotal()}</span>
                </div>

                <button
                  type="submit"
                  disabled={bookingStatus === "loading"}
                  className={`w-full mt-5 py-2 text-white rounded text-2xl ${
                    bookingStatus === "loading" ? "bg-gray-500" : "bg-[#af7b4f] hover:bg-[#8c6439]"
                  }`}
                >
                  {bookingStatus === "loading" ? "Booking..." : "Book Your Room"}
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      <style>{`
        .scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
