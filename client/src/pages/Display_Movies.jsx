import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useEffect, useState } from "react"; // Import useState and useEffect
import { displayallmovies } from "../services/movies"; // Correct service import
import FlipNavWrapper from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";


const ColorChangeCards = () => {

  // Rename state variable to a more appropriate name, e.g., 'movies'
  const [movies, setMovies] = useState([]);
  
  // Use a different function name for the local handler to avoid naming conflict
    const fetchMovies = async () => {
    const response = await displayallmovies();
    console.log(response);

    // Assuming the response structure has a 'status' and 'data' key
    if (response && response.status === 'success') {
      // Set the movies state with the data array
      setMovies(response.data);
    }
  };

  useEffect(() => {
    // Load the movies automatically when this component is launched
    fetchMovies();
  }, []); // Empty dependency array means it runs once on mount

  // Placeholder images for demonstration, as your SQL schema doesn't include image URLs
  const placeholderImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRyuWmayVBvqjd1MxTKpRgauq2cCtUzb7Q9QvaFTkAuxAU_EYMoCE3wBuJeftxIzf0grreIw&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_zzO-EIy8KZap33sLqiKWYpUzoBOMLlmtBw&s",
    "https://m.media-amazon.com/images/S/pv-target-images/6e3e579706908883944a6a0711295c8ef16fa7c9122e48d076a465e1464952bc.jpg",
    "https://images.unsplash.com/photo-1576328077645-2dd68934d2b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80",
    // Add more images if you expect more than 4 movies
  ];
  
  return (
    <div>
      <FlipNavWrapper/>
    <div className="p-4 md:p-8 bg-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 w-full max-w-6xl mx-auto">
        {/* Map over the 'movies' array to render the Card components */}
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <Card
            key={movie.movie_id}
            heading={movie.title}
            description={`Released: ${new Date(movie.release_date).toDateString()}`}
            imgSrc={placeholderImages[index % placeholderImages.length]}
            movieId={movie.movie_id} // Pass the movie_id here
/>   
          ))
        ) : (
          <p>Loading movies or no movies found...</p>
        )}
      </div>
    </div>
    </div>
    
  );
};

// Card and ShiftLetter components remain unchanged
const Card = ({ heading, description, imgSrc, movieId }) => {
  const navigate = useNavigate();
  const addReview = () => {
    localStorage.setItem("selectedMovieId", movieId);
    console.log("Movie ID stored:", movieId);
    navigate('/create_review'); // Optional: for debugging
  };

  return (
    <motion.div
      transition={{ staggerChildren: 0.035 }}
      whileHover="hover"
      className="w-full h-64 bg-slate-300 overflow-hidden cursor-pointer group relative"
    >
      <div
        className="absolute inset-0 saturate-100 md:saturate-0 md:group-hover:saturate-100 group-hover:scale-110 transition-all duration-500"
        style={{
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="p-4 relative z-20 h-full text-slate-300 group-hover:text-white transition-colors duration-500 flex flex-col justify-between">
        <FiArrowRight className="text-3xl group-hover:-rotate-45 transition-transform duration-500 ml-auto" />
        <div>
          <h4 className="text-3xl font-semibold">
            {heading.split("").map((l, i) => (
              <ShiftLetter letter={l} key={i} />
            ))}
          </h4>
          <p>{description}</p>
        </div>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={addReview}
        >
          Add Review
        </button>
      </div>
    </motion.div>
  );
};   

const ShiftLetter = ({ letter }) => {
  return (
    <div className="inline-block overflow-hidden h-[36px] font-semibold text-3xl">
      <motion.span
        className="flex flex-col min-w-[4px]"
        style={{
          y: "0%",
        }}
        variants={{
          hover: {
            y: "-50%",
          },
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <span>{letter}</span>
        <span>{letter}</span>
      </motion.span>
    </div>
  );
};

export default ColorChangeCards;