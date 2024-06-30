import { NotebookIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function ResumeCardItem({ resume }) {
  return (
    <Link to={"/dashboard/resume/1000/edit"}>
      <div className="p-14 bg-secondary flex justify-center items-center h-[280px] border-primary rounded-lg hover:scale-105 transition-all hover:shadow-md shadow-primary cursor-pointer ">
        <NotebookIcon />
      </div>
      <h2 className="text-center my-1 ">{resume.title}</h2>
    </Link>
  );
}

export default ResumeCardItem;
