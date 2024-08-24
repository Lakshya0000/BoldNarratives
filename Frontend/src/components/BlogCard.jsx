import { Link } from "react-router-dom";

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="p-6 mt-6 border border-slate-300 rounded-lg shadow-lg w-1/2 mx-auto  bg-white transition-transform transform hover:scale-105">
                
                <div className="mt-4">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <p className="text-md text-gray-700 mt-2">{content.slice(0, 100)}...</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                        <span className="font-semibold text-lg">{authorName}</span>
                        <span className="text-slate-500 text-sm">{publishedDate}</span>
                    </div>
                </div>
                <div className="mt-4 text-slate-500 text-sm">
                    {`${Math.ceil(content.length / 100)} minute(s) read`}
                </div>
            </div>
        </Link>
    );
}