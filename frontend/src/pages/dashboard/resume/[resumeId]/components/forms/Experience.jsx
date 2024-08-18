import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import useGetResume from "@/useHooks/useResume";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const initialFormDetails = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

function Experience({ enableNext }) {
  const [experienceList, setExperienceList] = useState([initialFormDetails]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [isLoading, setLoading] = useState(false);
  const { updateResume } = useGetResume();
  const params = useParams();

  const onSave = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const updatedResume = await updateResume(params.resumeId, resumeInfo);
    } catch (err) {
    }

    setLoading(false);
    toast({
      title: "Details Updated",
      description: "Experience Deatils Updated",
    });
    enableNext(true);
  };

  useEffect(() => {
    resumeInfo?.experience.length > 0 &&
      setExperienceList(resumeInfo?.experience);
  }, []);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const newExperienceList = [...experienceList];
    newExperienceList[index][name] = value;
    setExperienceList(newExperienceList);
  };

  const handleRichTextEditor = (event, name, index) => {
    const newExperienceList = [...experienceList];
    newExperienceList[index][name] = event.target.value;
    setExperienceList(newExperienceList);
  };

  const addNewExperience = () => {
    setExperienceList([...experienceList, initialFormDetails]);
  };

  const removeExperience = () => {
    if (experienceList.length > 1) {
      setExperienceList(experienceList.slice(0, -1));
    }
  };

  useEffect(() => {
    setResumeInfo((prevResumeInfo) => ({
      ...prevResumeInfo,
      experience: experienceList,
    }));
  }, [experienceList, setResumeInfo]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Experience</h2>
      <p>Add your previous experience</p>
      <form onSubmit={onSave}>
        <div>
          {experienceList.map((experience, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-3 my-5 p-3 border rounded-lg">
              <div>
                <label className="text-xs">Position Title</label>
                <Input
                  type="text"
                  name="title"
                  value={experience.title}
                  onChange={(event) => handleChange(event, index)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="text-xs">Company Name</label>
                <Input
                  type="text"
                  name="companyName"
                  value={experience.companyName}
                  onChange={(event) => handleChange(event, index)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="text-xs">City</label>
                <Input
                  type="text"
                  name="city"
                  value={experience.city}
                  onChange={(event) => handleChange(event, index)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="text-xs">State</label>
                <Input
                  type="text"
                  name="state"
                  value={experience.state}
                  onChange={(event) => handleChange(event, index)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="text-xs">Start Date</label>
                <Input
                  type="month"
                  name="startDate"
                  value={experience.startDate}
                  onChange={(event) => handleChange(event, index)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="text-xs">End Date</label>
                <Input
                  type="month"
                  name="endDate"
                  value={experience.endDate}
                  onChange={(event) => handleChange(event, index)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="col-span-2">
                <RichTextEditor
                  index={index}
                  defaultValue={experience.workSummary}
                  onRichTextEditorChange={(event) =>
                    handleRichTextEditor(event, "workSummary", index)
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-primary"
              onClick={addNewExperience}>
              + Add More Experience
            </Button>
            <Button
              variant="outline"
              className="text-primary"
              onClick={removeExperience}>
              - Remove
            </Button>
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Experience;
