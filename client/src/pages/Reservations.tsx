import { useEffect, useState } from 'react';
import { reservationsAPI } from '../services/api';
import { toast } from 'react-toastify';

const Reservations = () => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await reservationsAPI.getAll();
      setReservations(response.data.data || []);
    } catch (error) {
      toast.error('Failed to load reservations');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p>Loading reservations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Reservations</h1>

        {reservations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h2 className="text-2xl font-bold mb-2">No reservations yet</h2>
            <p className="text-gray-600 mb-6">Start booking your tables</p>
            <button className="btn-primary">Create Reservation</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reservations.map((reservation) => (
              <ReservationCard key={reservation._id} reservation={reservation} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ReservationCard = ({ reservation }: { reservation: any }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-lg font-bold">{reservation.name}</h3>
      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
        {reservation.status}
      </span>
    </div>
    <div className="space-y-2 text-gray-600">
      <p>📅 {new Date(reservation.date).toLocaleDateString()}</p>
      <p>🕐 {reservation.time}</p>
      <p>👥 {reservation.guests} guests</p>
    </div>
  </div>
);

export default Reservations;
