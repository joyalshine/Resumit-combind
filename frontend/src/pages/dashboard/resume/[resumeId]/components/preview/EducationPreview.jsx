import React from "react";

function EducationPreview({ resumeInfo }) {
  return (
    <div className="my-2">
      <h2 className="text-left font-bold  text-lg mb-2">Education</h2>
      <hr className="border-black border-[1.5px] my-1" />
      {resumeInfo.education?.map((education, index) => (
        <div className="my-2" key={index}>
          <h2 className="text-sm font-bold">{education.universityName}</h2>
          <h2 className="text-xs flex justify-between italic">
            {education.degree} in {education.major}
            <span>
              {education.startDate} - {education.endDate}
            </span>
          </h2>
          <div
            className="text-xs my-2"
            dangerouslySetInnerHTML={{ __html: education.description }}
          />
        </div>
      ))}
    </div>
  );
}

export default EducationPreview;
