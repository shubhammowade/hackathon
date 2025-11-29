import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { FiArrowRight, FiStar } from "react-icons/fi"; // Import Star icon
import { getAllReview } from '../services/reviews';
 import FlipNavWrapper from '../Navbar/Navbar';
const ReviewsList = () => {
  const [selected, setSelected] = useState("individual");
  return (
    <div>
       <FlipNavWrapper />
         <ReviewsList2 />
      </div>
   
   
 
  );
};
const ReviewsList2 = () => {
  
  const [reviews, setReviews] = useState([]);

  const getreviewList = async () => {
    
    const response = await getAllReview();
    console.log(response);
    if (response && response.status === 'success') {
     console.log(response)
      setReviews(response.data);
    }
  };

 
  useEffect(() => {
    getreviewList();
  }, []); 

  // Actions are handled within the card component now
  const onDeleteReview = (id) => {
    console.log(`Delete review with ID: ${id}`);
    // Implement actual delete logic here if needed
  };

  const onDetails = (id) => {
    console.log(`View details for review with ID: ${id}`);
    // Implement actual details view logic here if needed
  };

  return ( 
    <div className="p-4 md:p-8 bg-slate-100">
      <h2 className="text-2xl font-bold mb-6">User Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-6xl mx-auto">
        {reviews.length > 0 ? (
          reviews.map((reviewItem) => (
            <ReviewCard
              key={reviewItem.review_id} // Use review_id from schema
              rating={reviewItem.rating}
              reviewText={reviewItem.review}
              userId={reviewItem.user_id}
              reviewId={reviewItem.review_id}
              onDelete={() => onDeleteReview(reviewItem.review_id)}
              onDetails={() => onDetails(reviewItem.review_id)}
            />
          ))
        ) : (
          <p className="text-gray-500">No reviews found...</p>
        )}
      </div>
    </div>
  );
};

// A new Card component tailored for reviews, using framer-motion for UI flair
const ReviewCard = ({ rating, reviewText, userId, reviewId, onDelete, onDetails }) => {

  const generateStars = (count) => {
    return [...Array(count)].map((_, i) => (
      <FiStar key={i} className="text-yellow-400 fill-yellow-400 inline" />
    ));
  };

  return (
      
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-xl font-semibold mb-2">
            {generateStars(rating)}
            <span className='ml-2 text-gray-700'>{rating}/5</span>
          </div>
          <p className="text-sm text-gray-500">User ID: {userId}</p>
        </div>
        <FiArrowRight className="text-2xl text-blue-500" />
      </div>
      
      <p className="text-gray-700 mb-6 flex-grow">
        {reviewText}
      </p>

      <div className="flex justify-end gap-3 mt-auto">
        <button
          onClick={onDelete}
          className='bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm transition'
        >
          Delete
        </button>
        <button
          onClick={onDetails}
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm transition'
        >
          Details
        </button>
      </div>
    </motion.div>
  );
};

export default ReviewsList;
