import React from "react";

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className="my-2">
      <h2 className="text-left font-bold text-lg mb-2">Experience</h2>
      <hr className="border-black border-[1.5px] my-1" />
      {resumeInfo.experience?.map((experience, index) => (
        <div className="my-2" key={index}>
          <h2 className="text-sm font-bold flex justify-between">
            {experience.title}
            <span className="text-xs font-normal">
              {experience.startDate}
              {" - "}
              {experience.currentlyWorking
                ? "Present"
                : experience.endDate}{" "}
            </span>
          </h2>
          <h2 className="flex justify-between text-xs italic">
            {experience.companyName}
            <span>
              {experience.city}
              {" ,"} {experience.state}{" "}
            </span>
          </h2>
          {/* <p className="text-xs my-2">{experience.workSummery}</p> */}
          <div
            className="text-xs my-2"
            dangerouslySetInnerHTML={{ __html: experience.workSummary }}
          />
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
