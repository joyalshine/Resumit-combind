import { NotebookIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function ResumeCardItem({ resume }) {
  return (
    <Link to={`/resume/${resume._id}/edit`}>
      <div className="bg-secondary flex justify-center items-center  border-cyan-400 rounded-lg hover:scale-105 transition-all hover:shadow-md shadow-primary cursor-pointer border-2">
        <img
          src="/images/preview.jpg"
          alt=""
          className="rounded-lg"
          srcset=""
        />
        {/* <NotebookIcon /> */}
      </div>
      <h2 className="text-center my-1 ">{resume.title}</h2>
    </Link>
  );
}

export default ResumeCardItem;
