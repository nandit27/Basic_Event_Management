import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button'

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex">
        <Input
          type="text"
          placeholder="Search events..."
          className="rounded-r-none focus-visible:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button 
          type="submit"
          className="rounded-l-none bg-green-600 hover:bg-green-700"
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default Search; 