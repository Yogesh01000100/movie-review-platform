function Review({ movieId, comment, rating }) {
  return (
    <div>
      <h1>{movieId}</h1>
      <p>{comment}</p>
      <p>{rating}</p>
    </div>
  );
}
export default Review;
