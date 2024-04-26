import { useState } from "react";
import { useSelector } from "react-redux";
import { getReview } from "../services/user";
import Review from "./ReviewCard";
import withAuth from "./HOC";
import { useDispatch } from "react-redux";

function Home() {
  const data = useSelector((state) => state.auth.user);
  const [review, setReview] = useState([]);
  const dispatch = useDispatch();
  const handleFetchReviews = async () => {
    try {
      let reviewData = await getReview();
      if (reviewData) {
        setReview(reviewData.reviews);
      } else {
        dispatch({
          type: "API_CALL_FAILURE",
          payload: {
            status: 401,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="text-center">
        <button
          className="bg-blue-500 text-white font-semibold py-1 px-5 rounded hover:bg-blue-700 mt-5"
          onClick={handleFetchReviews}
        >
          Fetch reviews
        </button>

        <h2>Welcome, {data && data.displayName}!</h2>
        {data && data.photoURL && (
          <img
            src={data && data.photoURL}
            alt="User Profile"
            style={{ height: "100px", borderRadius: "50%" }}
          />
        )}
        <div>
          {review.map((reviewItem) => (
            <Review
              key={reviewItem.id}
              movieId={reviewItem.movieId}
              comment={reviewItem.comment}
              rating={reviewItem.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const HomePage = withAuth(Home);
export default HomePage;
