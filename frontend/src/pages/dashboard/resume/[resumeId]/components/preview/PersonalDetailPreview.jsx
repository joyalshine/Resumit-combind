import React from "react";

function PersonalDetailPreview({ resumeInfo }) {
  return (
    <div className="grid grid-cols-2 items-center">
      <div>
        <h2 className="font-bold text-lg">
          {resumeInfo.firstName} {resumeInfo.lastName}
        </h2>
        <h2 className="text-xs">{resumeInfo.email}</h2>
        <h2>
          <a
            target="_blank"
            className="text-xs font-normal"
            href={resumeInfo.githubLink}>
            Github
          </a>
        </h2>
      </div>
      <div className="text-right">
        <h2 className="text-xs">Email: {resumeInfo.email}</h2>
        <h2 className="text-xs">Mobile: {resumeInfo.phone}</h2>
        <h2>
          <a
            target="_blank"
            className="text-xs font-normal"
            href={resumeInfo.LinkedinLink}>
            Linkedin
          </a>
        </h2>
      </div>
    </div>
  );
}

export default PersonalDetailPreview;
