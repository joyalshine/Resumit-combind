import React from "react";

function SkillsPreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2 className="text-left font-bold  text-lg mb-2">Skills</h2>
      <hr className="border-black border-[1.5px] my-1" />
      <div className="grid grid-cols-2 gap-3 my-4">
        <div>
          <h3 className="font-bold text-sm">Frontend Languages</h3>
        </div>
        <div className="flex flex-row text-xs">
          {resumeInfo.skills?.frontendLanguages?.join(", ")}
        </div>
        <div>
          <h3 className="font-bold text-sm">Backend Languages</h3>
        </div>
        <div className="flex flex-row text-xs">
          {resumeInfo.skills?.backendLanguages?.join(", ")}
        </div>
        <div>
          <h3 className="font-bold text-sm">Developer Tools</h3>
        </div>
        <div className="flex flex-row text-xs">
          {resumeInfo.skills?.developerTools?.join(", ")}
        </div>
        <div>
          <h3 className="font-bold text-sm">Libraries</h3>
        </div>
        <div className="flex flex-row text-xs">
          {resumeInfo.skills?.libraries?.join(", ")}
        </div>
      </div>
    </div>
  );
}

export default SkillsPreview;
