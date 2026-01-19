import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { userName, user_photoURL } = review;
  return (
    <div className="max-w-md bg-base-100 shadow-xl rounded-2xl p-8 relative overflow-hidden">
      {/* Quote icon */}
      <FaQuoteLeft className="text-5xl text-primary opacity-20 absolute top-4 left-4" />

      {/* Review text */}
      <p className="text-base text-gray-600 mt-8">
        A posture corrector works by providing support and gentle alignment to
        your shoulders, back, and spine, encouraging you to maintain proper
        posture throughout the day.
      </p>

      {/* Divider */}
      <div className="border-t border-dashed my-6"></div>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={user_photoURL} alt="" />
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-lg">{userName}</h4>
          <p className="text-sm text-gray-500">Senior Product Designer</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
