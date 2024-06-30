import React from "react";

function ProjectePreview({ resumeInfo }) {
  return (
    <div className="my-2">
      <h2 className="text-left font-bold  text-lg mb-2">Project</h2>
      <hr className="border-black border-[1.5px] my-1" />
      {resumeInfo.project?.map((project, index) => (
        <div className="my-2" key={index}>
          <h2 className="text-sm font-bold flex justify-between">
            {project.projectName}

            <a className="text-xs font-normal " href={project.githubLink}>
              Github
            </a>
          </h2>
          <h2 className="text-xs italic">{project.technologies.join(" | ")}</h2>
          <div
            className="text-xs my-2"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
        </div>
      ))}
    </div>
  );
}

export default ProjectePreview;
