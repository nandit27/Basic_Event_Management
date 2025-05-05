import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-6">Page Not Found</h2>
      <p className="text-gray-500 text-center max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button className="bg-green-600 hover:bg-green-700">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound; 