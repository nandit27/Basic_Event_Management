import { Link } from 'react-router-dom';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '../ui/card';
import { Button } from '../ui/button';


const EventCard = ({ event, onDelete, viewDetails, showActions = true }) => {
  const typeColors = {
    Academic: 'border-blue-500 bg-blue-50',
    Cultural: 'border-purple-500 bg-purple-50',
    Sports: 'border-green-500 bg-green-50',
    Technical: 'border-orange-500 bg-orange-50',
    Workshop: 'border-yellow-500 bg-yellow-50',
    Other: 'border-gray-500 bg-gray-50',
  };

  const borderColor = typeColors[event.type] || typeColors.Other;
  
  return (
    <Card className={`overflow-hidden border-l-4 transition-all hover:shadow-md ${borderColor}`}>
      <div className="relative">
        <img
          src={event.image ? `http://localhost:5003${event.image}` : 'https://via.placeholder.com/300x150?text=No+Image'}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded text-xs">
          {event.type}
        </span>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1">{event.title}</CardTitle>
        <CardDescription className="line-clamp-2">{event.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-2">
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-gray-500 mr-1"
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
          <span className="text-sm text-gray-500">{event.date}</span>
        </div>
        
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-gray-500 mr-1"
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
          <span className="text-sm text-gray-500">{event.time}</span>
        </div>
        
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-gray-500 mr-1"
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
          <span className="text-sm text-gray-500 line-clamp-1">{event.location}</span>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="ghost" 
          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0" 
          onClick={() => viewDetails(event)}
        >
          View Details
        </Button>
        
        {showActions && (
          <div className="flex space-x-2">
            <Link to={`/edit-event/${event._id}`}>
              <Button 
                variant="outline" 
                className="bg-yellow-500 hover:bg-yellow-600 text-white border-0"
                size="sm"
              >
                Edit
              </Button>
            </Link>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => onDelete(event._id)}
            >
              Delete
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard; 