import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: '',
    organizer: '',
  });
  
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  
  const { title, description, date, time, location, type, organizer } = formData;
  
  const eventTypes = [
    'Academic',
    'Cultural',
    'Sports',
    'Technical',
    'Workshop',
    'Other',
  ];
  
  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5003/api/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }
        
        const data = await response.json();
        
        // Format date for input field
        const eventDate = new Date(data.date);
        const formattedDate = eventDate.toISOString().split('T')[0];
        
        setFormData({
          title: data.title,
          description: data.description,
          date: formattedDate,
          time: data.time,
          location: data.location,
          type: data.type,
          organizer: data.organizer,
        });
        
        if (data.image) {
          setCurrentImage(data.image);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        setError('Failed to load event data. Please try again.');
      } finally {
        setInitialLoading(false);
      }
    };
    
    fetchEvent();
  }, [id, token]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const eventFormData = new FormData();
      eventFormData.append('title', title);
      eventFormData.append('description', description);
      eventFormData.append('date', date);
      eventFormData.append('time', time);
      eventFormData.append('location', location);
      eventFormData.append('type', type);
      eventFormData.append('organizer', organizer);
      
      if (image) {
        eventFormData.append('image', image);
      }
      
      const response = await fetch(`http://localhost:5003/api/events/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: eventFormData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update event');
      }
      
      navigate(`/events/${id}`);
    } catch (error) {
      console.error('Error updating event:', error);
      setError(error.message || 'Failed to update event. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-2xl text-gray-500">Loading event data...</div>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Event</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Edit Event Details</CardTitle>
          <CardDescription>
            Update the information for this event
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Event Title *
                </label>
                <Input
                  id="title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-medium">
                  Event Type *
                </label>
                <select
                  id="type"
                  name="type"
                  value={type}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                >
                  <option value="">Select Event Type</option>
                  {eventTypes.map((eventType) => (
                    <option key={eventType} value={eventType}>
                      {eventType}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Event Date *
                </label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={date}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="time" className="text-sm font-medium">
                  Event Time *
                </label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={time}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location *
                </label>
                <Input
                  id="location"
                  name="location"
                  value={location}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="organizer" className="text-sm font-medium">
                  Organizer *
                </label>
                <Input
                  id="organizer"
                  name="organizer"
                  value={organizer}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Event Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={handleChange}
                rows={5}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">
                Event Image
              </label>
              
              {currentImage && !previewUrl && (
                <div className="mt-2 mb-4">
                  <p className="text-sm text-gray-500 mb-2">Current Image:</p>
                  <img
                    src={`http://localhost:5003${currentImage}`}
                    alt="Current event"
                    className="h-40 object-cover rounded border"
                  />
                </div>
              )}
              
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              
              {previewUrl && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-2">New Image:</p>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-40 object-cover rounded border"
                  />
                </div>
              )}
            </div>
            
            <CardFooter className="flex justify-between px-0">
              <Link to={`/events/${id}`}>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Event'}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditEvent; 