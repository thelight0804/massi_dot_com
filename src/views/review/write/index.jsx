import react from 'react';
import { useParams } from 'react-router-dom';

const WriteReview = () => {
  var { id } = useParams();
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
}

export default WriteReview;