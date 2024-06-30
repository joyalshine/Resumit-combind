import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import useGetResume from "@/useHooks/useResume";
import { MultiSelectInputSkills } from "../MultiSelectInput";

const initialFormDetails = {
  frontendLanguages: [],
  backendLanguages: [],
  developerTools: [],
  libraries: [],
};
function SkillForm({ enableNext }) {
  const [skillsList, setSkillsList] = useState(initialFormDetails);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [isLoading, setLoading] = useState(false);
  const { updateResume } = useGetResume();
  const params = useParams();

  const onSave = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const updatedResume = await updateResume(params.resumeId, resumeInfo);
      console.log("updatedResume", updatedResume);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
    toast({
      title: "Details Updated",
      description: "Personal Details Updated",
    });
    enableNext(true);
  };

  useEffect(() => {
    resumeInfo?.skills && setSkillsList(resumeInfo.skills);
  }, []);

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add your current tech stack</p>
      <form>
        <div className="">
          <MultiSelectInputSkills
            content={resumeInfo.skills.frontendLanguages}
            contentList={skillsList}
            setContentList={setSkillsList}
            fieldKey="frontendLanguages"
            label="Frontend Languages"
          />
        </div>
        <div className="">
          <MultiSelectInputSkills
            content={resumeInfo.skills.backendLanguages}
            contentList={skillsList}
            setContentList={setSkillsList}
            fieldKey="backendLanguages"
            label="Backend Languages"
          />
        </div>
        <div className="">
          <MultiSelectInputSkills
            content={resumeInfo.skills.developerTools}
            contentList={skillsList}
            setContentList={setSkillsList}
            fieldKey="developerTools"
            label="Developer Tools"
          />
        </div>
        <div className="">
          <MultiSelectInputSkills
            content={resumeInfo.skills.libraries}
            contentList={skillsList}
            setContentList={setSkillsList}
            fieldKey="libraries"
            label="Libraries"
          />
        </div>
      </form>
    </div>
  );
}

export default SkillForm;
