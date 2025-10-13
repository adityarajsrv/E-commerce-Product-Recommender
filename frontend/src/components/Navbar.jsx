const Navbar = () => {
  return (
    <nav className="bg-black p-3 sm:p-4 mb-4 sm:mb-5">
      <div className="container mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-white text-center font-bold break-words">
          E-Commerce Product Recommender
        </h1>
        <p className="text-gray-300 text-center text-xs sm:text-sm mt-1 sm:mt-2">
          AI-Powered Personalized Recommendations
        </p>
      </div>
    </nav>
  );
};

export default Navbar;