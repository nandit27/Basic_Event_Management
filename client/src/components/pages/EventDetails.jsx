import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { Button } from '../ui/button';

const EventDetails = () => {
  const { id } = useParams();
  const { isAuthenticated, token } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5003/api/events/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }
        
        const data = await response.json();
        setEvent(data);
        
        // Check if authenticated user is the owner
        if (isAuthenticated && token) {
          const profileRes = await fetch('http://localhost:5003/api/auth/profile', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (profileRes.ok) {
            const userData = await profileRes.json();
            setIsOwner(userData._id === data.user);
          }
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        setError('Failed to load event details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvent();
  }, [id, isAuthenticated, token]);
  
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5003/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
      
      navigate('/');
    } catch (error) {
      console.error('Delete error:', error);
      setError('Failed to delete event. Please try again.');
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-2xl text-gray-500">Loading event details...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        {error}
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold text-gray-600">Event not found</h2>
        <p className="mt-2 text-gray-500">The event you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="inline-block mt-4">
          <Button className="bg-green-600 hover:bg-green-700">
            Back to Events
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/">
          <Button variant="outline" className="mb-4">
            &larr; Back to Events
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={event.image ? `http://localhost:5003${event.image}` : 'https://via.placeholder.com/1200x400?text=No+Image'}
            alt={event.title}
            className="w-full h-72 object-cover"
          />
          <span className="absolute bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold">
            {event.type}
          </span>
        </div>
        
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          
          <div className="mb-8">
            <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-gray-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-gray-700"><strong>Date:</strong> {event.date}</span>
            </div>
            
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-gray-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-gray-700"><strong>Time:</strong> {event.time}</span>
            </div>
            
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-gray-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-gray-700"><strong>Location:</strong> {event.location}</span>
            </div>
            
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-gray-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-gray-700"><strong>Organizer:</strong> {event.organizer}</span>
            </div>
          </div>
          
          {isAuthenticated && isOwner && (
            <div className="flex space-x-4 border-t pt-6">
              <Link to={`/edit-event/${event._id}`} className="flex-1">
                <Button 
                  variant="outline" 
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white border-0"
                >
                  Edit Event
                </Button>
              </Link>
              <Button 
                variant="destructive" 
                className="flex-1"
                onClick={handleDelete}
              >
                Delete Event
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails; 