import { useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import Flex from './Flex';

const StarRating = () => {
  const [score, setScore] = useState(0);
  const [scoreFixed, setScoreFixed] = useState(score);

  const handleLeftEnter = (id: number) => setScore(id + 0.5);
  const handleRightEnter = (id: number) => setScore(id + 1);

  const handleStarClick = () => setScoreFixed(score);
  const handleStarLeave = () => {
    if (score !== scoreFixed) setScore(scoreFixed);
  };

  return (
    <Flex>
      {Array(5)
        .fill(0)
        .map((_, id) => (
          <div
            key={id}
            className="relative size-8 cursor-pointer"
            onClick={handleStarClick}
          >
            {score - Math.floor(score) === 0.5 && Math.floor(score) === id ? (
              <FaStarHalfAlt className="absolute text-yellow-400" size={32} />
            ) : id + 1 > score ? (
              <FaStar className="absolute text-gray-300" size={32} />
            ) : (
              <FaStar className="absolute text-yellow-400" size={32} />
            )}
            <div
              className="absolute left-0 top-0 h-full w-1/2"
              onMouseEnter={() => handleLeftEnter(id)}
              onMouseLeave={handleStarLeave}
            />
            <div
              className="absolute right-0 top-0 h-full w-1/2"
              onMouseEnter={() => handleRightEnter(id)}
              onMouseLeave={handleStarLeave}
            />
          </div>
        ))}
    </Flex>
  );
};

export default StarRating;
