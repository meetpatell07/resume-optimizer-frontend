import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        AI Resume & Cover Letter Generator
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Provide job details and get an AI-generated resume and cover letter.
      </p>
      <Link to="/generate">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Home;
