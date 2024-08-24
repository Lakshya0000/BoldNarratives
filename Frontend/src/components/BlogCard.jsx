import { Link } from "react-router-dom";

const colors = [
    { bg: 'bg-red-500', border: 'border-red-500' },
    { bg: 'bg-blue-500', border: 'border-blue-500' },
    { bg: 'bg-green-500', border: 'border-green-500' },
    { bg: 'bg-yellow-500', border: 'border-yellow-500' },
    { bg: 'bg-purple-500', border: 'border-purple-500' },
    { bg: 'bg-orange-500', border: 'border-orange-500' },
  ];

  const GenreIndicator = ({ genre }) => {
    // Function to get a random color class from the colors array
    const getRandomColor = () => {
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    };

    const {bg,border} = getRandomColor();
    
  return (
    <span className={`text-slate-500 text-sm border rounded-2xl p-1 w-20 flex-frow items-center flex justify-evenly ${border}`}>
      <div className={`w-3 h-3 rounded-full ${bg}`}></div>
      {genre}
    </span>
  );
};

export const BlogCard = ({
    id,
    authorName,
    title,
    
    publishedDate
}) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="p-6 mt-6 border border-slate-300 rounded-lg shadow-lg w-1/2 mx-auto  bg-white transition-transform transform hover:scale-105">
                
                <div className="mt-4">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <p className="text-md text-gray-700 mt-2">Content</p>
                </div>
                <div className="flex flex-col space-x-4 w-full">
                    <div className="flex flex-col justify-end items-end w-full">
                        <span className="font-semibold text-lg ">{authorName}</span>
                        <GenreIndicator genre="Sci-Fi" />
                        <span className="text-slate-500 font-bold text-sm">Uploaded on {publishedDate}</span>
                    </div>
                    
                </div>
                
            </div>
        </Link>
    );
}