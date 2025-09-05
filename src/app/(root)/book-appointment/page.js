"use client";
import { useState } from "react";

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    branch: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/send-to-sheet", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (result.success) {
        alert("✅ Your appointment has been booked successfully!");
        setFormData({
          name: "",
          phone: "",
          email: "",
          date: "",
          time: "",
          branch: "",
          notes: "",
        });
      } else {
        alert("❌ Failed to book. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Something went wrong. Try again later.");
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-6 px-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            Book Your Hair Transplant Appointment
          </h2>
          <p className="text-sm md:text-base mt-2 opacity-90">
            Fill in your details below & our team will contact you shortly.
          </p>
        </div>

        {/* Form */}
        <div className="p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Preferred Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Branch */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Select Branch
              </label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">Choose a branch</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Notes / Concerns (optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Enter any concerns or queries..."
                rows="3"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold text-white text-lg shadow-md transform transition-all duration-200 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] hover:shadow-lg"
              }`}
            >
              {loading ? "Booking..." : "Book Appointment"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
