import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="mb-2 text-4xl font-bold">Home</h1>
            <Link to='/tasks' className="text-2xl underline">Tasks</Link>
        </div>
    );
};

export default Home;