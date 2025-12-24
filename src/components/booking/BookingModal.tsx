import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Doctor {
  id?: string | number;
  name: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
}

export default function BookingModal({ isOpen, onClose, doctor }: Props) {
  const [dateTime, setDateTime] = useState("");
  const [type, setType] = useState("Consultation");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!isOpen || !doctor) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please sign in to book an appointment");
      navigate("/auth");
      return;
    }

    if (!dateTime) {
      toast.error("Please select date and time");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        doctorId: (doctor as any)._id ?? doctor.id,
        date: new Date(dateTime).toISOString(),
        type,
        notes,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/appointments`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data?.message || "Appointment requested");
      onClose();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message || "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-bold mb-4">Book appointment with {doctor.name}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-200 mb-1">Date & time</label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-200 mb-1">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <option>Consultation</option>
              <option>Follow-up</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-200 mb-1">Notes (optional)</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100" rows={3}></textarea>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="flex-1 bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg font-bold" disabled={loading}>
              {loading ? "Booking..." : "Request Appointment"}
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded-lg">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
