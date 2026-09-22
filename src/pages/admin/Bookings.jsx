import { useState, useEffect } from 'react';
import { Calendar, Mail, Phone, User, Trash2, CheckCircle, Clock, MessageSquare, X } from 'lucide-react';
import { listenToBookings, updateBookingStatus, deleteBooking, addBookingNotes } from '../../services/bookingsService';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [notes, setNotes] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const unsubscribe = listenToBookings((data) => {
      setBookings(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const handleAddNotes = async (bookingId) => {
    if (!notes.trim()) return;
    try {
      await addBookingNotes(bookingId, notes);
      setNotes('');
      setSelectedBooking(null);
    } catch (error) {
      alert('Failed to add notes');
    }
  };

  const handleDelete = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteBooking(bookingId);
      } catch (error) {
        alert('Failed to delete booking');
      }
    }
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#60a5fa';
      case 'confirmed': return '#4ade80';
      case 'completed': return '#3b82f6';
      case 'cancelled': return '#ef4444';
      default: return '#888';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'confirmed': return <CheckCircle size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      case 'cancelled': return <X size={16} />;
      default: return null;
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#102C42', marginBottom: '8px', letterSpacing: '-0.5px' }}>Bookings & Consultations</h1>
        <p style={{ color: '#526673', fontSize: '14px' }}>Manage all client booking requests and calendar sessions</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Total Bookings', value: bookings.length, color: '#102C42', bg: '#F2FAFD' },
          { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: '#d97706', bg: '#FEF3C7' },
          { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, color: '#16a34a', bg: '#DCFCE7' },
          { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length, color: '#2563eb', bg: '#DBEAFE' },
        ].map(stat => (
          <div key={stat.label} style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: '14px', padding: '20px', boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
            <div style={{ fontSize: '12px', color: '#526673', marginBottom: '8px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>{stat.label}</div>
            <div style={{ fontSize: '32px', fontWeight: 800, color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              padding: '8px 18px',
              borderRadius: '10px',
              border: '1px solid ' + (filter === status ? '#102C42' : '#DCE9EE'),
              background: filter === status ? '#102C42' : '#FFFFFF',
              color: filter === status ? '#FFFFFF' : '#526673',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '13px',
              transition: 'all 0.2s',
              textTransform: 'capitalize',
              boxShadow: filter === status ? '0 2px 6px rgba(16,44,66,0.15)' : 'none'
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#526673' }}>Loading bookings...</div>
      ) : filteredBookings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#526673', background: '#FFFFFF', borderRadius: '14px', border: '1px solid #DCE9EE' }}>No bookings found</div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {filteredBookings.map(booking => (
            <div key={booking.id} style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: '14px', padding: '22px', minWidth: 0, boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(240px, 45vw, 450px), 1fr))', gap: '20px', marginBottom: '16px' }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#F2FAFD', border: '1px solid #DCE9EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={20} color="#102C42" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#102C42' }}>{booking.name}</h3>
                      <p style={{ fontSize: '12px', color: '#526673' }}>Booking ID: {booking.id.slice(0, 8)}</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#526673' }}>
                      <Mail size={14} color="#102C42" />
                      <a href={`mailto:${booking.email}`} style={{ color: '#102C42', textDecoration: 'none', fontWeight: 600 }}>{booking.email}</a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#526673' }}>
                      <Phone size={14} color="#102C42" />
                      <a href={`tel:${booking.phone}`} style={{ color: '#102C42', textDecoration: 'none', fontWeight: 600 }}>{booking.phone}</a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#526673' }}>
                      <Calendar size={14} color="#102C42" />
                      {booking.date} at {booking.time}
                    </div>
                  </div>

                  {booking.message && (
                    <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '12px', marginBottom: '12px' }}>
                      <p style={{ fontSize: '12px', color: '#526673', marginBottom: '4px', fontWeight: 700 }}>Message:</p>
                      <p style={{ fontSize: '13px', color: '#102C42', lineHeight: '1.5' }}>{booking.message}</p>
                    </div>
                  )}

                  {booking.notes && (
                    <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '12px' }}>
                      <p style={{ fontSize: '12px', color: '#526673', marginBottom: '4px', fontWeight: 700 }}>Notes:</p>
                      <p style={{ fontSize: '13px', color: '#102C42', lineHeight: '1.5' }}>{booking.notes}</p>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', color: getStatusColor(booking.status), fontWeight: 700, fontSize: '13px' }}>
                    {getStatusIcon(booking.status)}
                    {booking.status}
                  </div>

                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                    style={{
                      padding: '8px 12px',
                      background: '#FFFFFF',
                      border: '1px solid #DCE9EE',
                      borderRadius: '8px',
                      color: '#102C42',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  <button
                    onClick={() => setSelectedBooking(booking.id === selectedBooking ? null : booking.id)}
                    style={{
                      padding: '8px 12px',
                      background: '#F2FAFD',
                      border: '1px solid #DCE9EE',
                      borderRadius: '8px',
                      color: '#102C42',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    <MessageSquare size={14} />
                    Notes
                  </button>

                  <button
                    onClick={() => handleDelete(booking.id)}
                    style={{
                      padding: '8px 12px',
                      background: '#FEE2E2',
                      border: '1px solid #FECACA',
                      borderRadius: '8px',
                      color: '#DC2626',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>

              {selectedBooking === booking.id && (
                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes about this booking..."
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#F8FAFC',
                      border: '1px solid #DCE9EE',
                      borderRadius: '8px',
                      color: '#102C42',
                      fontSize: '13px',
                      minHeight: '80px',
                      resize: 'vertical',
                      marginBottom: '12px',
                    }}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleAddNotes(booking.id)}
                      style={{
                        padding: '8px 16px',
                        background: '#102C42',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Save Notes
                    </button>
                    <button
                      onClick={() => setSelectedBooking(null)}
                      style={{
                        padding: '8px 16px',
                        background: '#FFFFFF',
                        border: '1px solid #DCE9EE',
                        borderRadius: '8px',
                        color: '#526673',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
