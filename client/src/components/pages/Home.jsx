import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Search from '../events/Search';
import EventCard from '../events/EventCard';
import EventModalDialog from '../events/EventModalDialogue';
import { Button } from '../ui/button';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { isAuthenticated, token } = useContext(AuthContext);

  // Fetch all events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5003/api/events');
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        
        const data = await response.json();
        setEvents(data);
        setFilteredEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  // Handle search functionality
  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredEvents(events);
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5003/api/events/search?query=${searchTerm}`);
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      const data = await response.json();
      setFilteredEvents(data);
    } catch (error) {
      console.error('Search error:', error);
      setError('Search failed. Please try again.');
    }
  };

  // Delete event
  const handleDelete = async (id) => {
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
      
      // Remove the deleted event from state
      setEvents(events.filter(event => event._id !== id));
      setFilteredEvents(filteredEvents.filter(event => event._id !== id));
    } catch (error) {
      console.error('Delete error:', error);
      setError('Failed to delete event. Please try again.');
    }
  };

  // View event details
  const viewEventDetails = (event) => {
    setSelectedEvent(event);
  };

  // Close modal
  const closeModal = () => {
    setSelectedEvent(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-2xl text-gray-500">Loading events...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">College Events</h1>
        {isAuthenticated && (
          <Link to="/add-event">
            <Button className="bg-green-600 hover:bg-green-700">
              Add New Event
            </Button>
          </Link>
        )}
      </div>

      <Search onSearch={handleSearch} />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {filteredEvents.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold text-gray-600">No events found</h2>
          <p className="mt-2 text-gray-500">Try adjusting your search or add a new event.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onDelete={handleDelete}
              viewDetails={() => viewEventDetails(event)}
              showActions={isAuthenticated}
            />
          ))}
        </div>
      )}

      {selectedEvent && (
        <EventModalDialog event={selectedEvent} onClose={closeModal} />
      )}
    </div>
  );
};

export default Home; 