import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import useGetResume from "@/useHooks/useResume";
import { MultiSelectInputSkills } from "../MultiSelectInput";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

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
  const [isPageLoading, setPageLoading] = useState(true);

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
      description: "Skills Details Updated",
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
    setPageLoading(false);
  }, [skillsList]);

  return isPageLoading ? (
    <LoadingPage />
  ) : (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add your current tech stack</p>

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

      <div className="flex flex-col md:flex-row justify-end mt-5">
        <Button onClick={onSave}>
          {isLoading ? <Loader2 className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default SkillForm;