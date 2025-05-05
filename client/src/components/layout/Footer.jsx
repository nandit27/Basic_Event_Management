const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {year} College Events. All rights reserved.</p>
        <p className="mt-2 text-sm text-gray-400">
          A platform for managing college events efficiently
        </p>
      </div>
    </footer>
  );
};

export default Footer; 