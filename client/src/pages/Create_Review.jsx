import { AnimatePresence, motion } from "framer-motion";
import { div } from "framer-motion/client"; // Note: this import is likely incorrect/unused, standard motion.div is used below.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FlipNavWrapper from "../Navbar/Navbar";
import { addreview } from "../services/reviews";
import { toast } from "react-toastify"; // Import toast for notifications

const ShiftingContactForm = () => {
  const [selected, setSelected] = useState("individual");
  // email is retrieved but currently unused in this component's top level
  // const email = localStorage.getItem('email'); 
  
  return (
    <div>
      <FlipNavWrapper />
       <section className="p-4 bg-slate-100">
      <div className="w-full max-w-6xl mx-auto shadow-lg flex flex-col-reverse lg:flex-row rounded-lg overflow-hidden">
        
        <Form selected={selected} setSelected={setSelected} />
        <Images selected={selected} />
      </div>
    </section>
    </div>
   
  );
};

const Form = ({ selected, setSelected }) => {
   const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const selectedMovieId = localStorage.getItem('selectedMovieId');
  const user_id = 2;
  const modifieddate = "2023/23/23"; // Note: This date format is invalid for SQL DATETIME. Use YYYY-MM-DD or rely on the backend to set the timestamp.

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();  
    console.log(rating);
    console.log(review); 
    try {
        const response = await addreview(
          selectedMovieId,
          review,
          rating,
          user_id, // Use email from localStorage here
          modifieddate
        );
        console.log(response);
        if (response['status'] === 'success') {
          toast.success('Successfully added review'); // Changed message
          navigate('/allreviews');
        } else {
          toast.error(response['error']);
        }
    } catch (error) {
        toast.error("An error occurred during review submission");
    }
  };

  // FIX: Added 'return' before the opening parenthesis of the JSX
  return (
    <div className={`${
      selected === "company" ? "bg-indigo-600" : "bg-violet-600"
    } w-full p-8 transition-colors duration-[750ms]`}>
        
      <h3 className="text-4xl font-bold mb-6 text-white">Create Review for Titanic</h3>

      <div className="mb-6">
        <p className="text-2xl mb-2 text-white">Rating (1-10)</p>
        <input
         onChange={(e) => setRating(e.target.value)}
         value={rating} // Added value binding to control the input
          type="number"
          placeholder="Ratings .."
          className={`${
            selected === "company" ? "bg-indigo-700" : "bg-violet-700"
          } transition-colors duration-[750ms] placeholder-white/70 p-2 rounded-md w-full focus:outline-0 text-white`}
        />
      </div>

      <AnimatePresence>
        {selected === "company" && (
          <motion.div
            initial={{
              marginTop: -104,
              opacity: 0,
            }}
            animate={{
              marginTop: 0,
              opacity: 1,
            }}
            exit={{
              marginTop: -104,
              opacity: 0,
            }}
            transition={BASE_TRANSITION}
            className="mb-6"
          >
            <p className="text-2xl mb-2">by the name of...</p>
           
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info */}
      <div className="mb-6">
        <p className="text-2xl mb-2 text-white">Your Review</p>
        <textarea
          onChange={(e) => setReview(e.target.value)}
          value={review} // Added value binding to control the textarea
          placeholder="Write your review here.."
          className={`${
            selected === "company" ? "bg-indigo-700" : "bg-violet-700"
          } transition-colors duration-[750ms] min-h-[150px] resize-none placeholder-white/70 p-2 rounded-md w-full focus:outline-0 text-white`}
        />
      </div>

      {/* Submit */}
      <motion.button
        whileHover={{
          scale: 1.01,
        }}
        whileTap={{
          scale: 0.99,
        }}
        className={`${
          selected === "company"
            ? "bg-white text-indigo-600"
            : "bg-white text-violet-600"
        } transition-colors duration-[750ms] text-lg text-center rounded-lg w-full py-3 font-semibold`}
        onClick={handleSubmit}   
      >
        Submit
      </motion.button>
    </div>
  );
};



const Images = ({ selected }) => {
  return (
    <div className="bg-white relative overflow-hidden w-full min-h-[100px]">
      <motion.div
        initial={false}
        animate={{
          x: selected === "individual" ? "0%" : "100%",
        }}
        transition={BASE_TRANSITION}
        className="absolute inset-0 bg-slate-200"
        style={{
          backgroundImage:
            "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSqLo27BqEGUMa8UQbAzE7bUzT789hVqxISA&s)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <motion.div
        initial={false}
        animate={{
          x: selected === "company" ? "0%" : "-100%",
        }}
        transition={BASE_TRANSITION}
        className="absolute inset-0 bg-slate-200"
        style={{
          backgroundImage:
            "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSqLo27BqEGUMa8UQbAzE7bUzT789hVqxISA&s)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};

export default ShiftingContactForm;

const BASE_TRANSITION = { ease: "anticipate", duration: 0.75 };
