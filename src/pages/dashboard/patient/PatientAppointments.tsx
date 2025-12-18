import SidebarLayout from '../../../components/dashboard/SidebarLayout';
import { FaCalendarAlt, FaUserMd, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

// Static interface until API is ready
interface Appointment {
    id: number;
    doctorName: string;
    department: string;
    date: string;
    time: string;
    status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
    location: string;
}

const PatientAppointments = () => {
    // Static data
    const appointments: Appointment[] = [
        { id: 1, doctorName: "Dr. John Smith", department: "Cardiology", date: "2024-10-24", time: "09:00 AM", status: "Confirmed", location: "Room 302, 3rd Floor" },
        { id: 2, doctorName: "Dr. Sarah Lee", department: "Dermatology", date: "2024-11-12", time: "10:30 AM", status: "Pending", location: "Room 105, 1st Floor" },
         { id: 3, doctorName: "Dr. Mike Ross", department: "General Medicine", date: "2024-09-15", time: "02:00 PM", status: "Completed", location: "Room 201, 2nd Floor" },
    ];

    return (
        <SidebarLayout>
             <div className="max-w-5xl mx-auto space-y-6 animate-fade-in-up">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <FaCalendarAlt className="text-sky-600" />
                            My Appointments
                        </h2>
                        <p className="text-sm text-gray-500">Track your past and upcoming visits.</p>
                    </div>
                    {/* Add Request Appointment Button later */}
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {appointments.map(apt => (
                        <div key={apt.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-sky-50 rounded-lg text-sky-600">
                                    <FaUserMd className="text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">{apt.doctorName}</h3>
                                    <p className="text-sm text-gray-500 font-medium">{apt.department}</p>
                                    <div className="max-md:mt-2 flex items-center gap-4 text-sm text-gray-500 mt-1">
                                        <span className="flex items-center gap-1"><FaCalendarAlt /> {apt.date}</span>
                                        <span className="flex items-center gap-1"><FaClock /> {apt.time}</span>
                                    </div>
                                     <div className="text-sm text-gray-400 mt-1 flex items-center gap-1">
                                        <FaMapMarkerAlt /> {apt.location}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex flex-col items-end gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                                    apt.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                    apt.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                    apt.status === 'Completed' ? 'bg-gray-100 text-gray-700' :
                                    'bg-red-100 text-red-700'
                                }`}>
                                    {apt.status}
                                </span>
                                {apt.status === 'Confirmed' && (
                                    <button className="text-sm text-red-500 hover:text-red-700 font-medium">Cancel Appointment</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SidebarLayout>
    );
};

export default PatientAppointments;
