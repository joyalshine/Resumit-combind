import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import RichTextEditor from "../RichTextEditor";
import { toast } from "@/components/ui/use-toast";
import useGetResume from "@/useHooks/useResume";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const initialFormDetails = {
  universityName: "",
  degree: "",
  major: "",
  startDate: "",
  endDate: "",
  description: "",
};
function Education({ enableNext }) {
  const [educationList, setEducationList] = useState([initialFormDetails]);
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
      description: "Education Deatils Updated",
    });
    enableNext(true);
  };

  useEffect(() => {
    resumeInfo?.education.length > 0 && setEducationList(resumeInfo.education);
  }, []);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const newEducationList = [...educationList];
    if (name == "startDate" || name == "endDate") {
      newEducationList[index][name] = value.substring(0, 4);
    } else newEducationList[index][name] = value;
    setEducationList(newEducationList);
  };

  const AddNewEducation = () => {
    setEducationList([...educationList, initialFormDetails]);
  };

  const RemoveEducation = () => {
    setEducationList(educationList.slice(0, -1));
  };

  const handleRichTextEditor = (event, name, index) => {
    const newEducationList = [...educationList];
    newEducationList[index][name] = event.target.value;
    setEducationList(newEducationList);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationList,
    });
  }, [educationList]);
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your eduaction details</p>
      <form onSubmit={onSave}>
        <div className="">
          {educationList.map((education, index) => (
            <div
              className="grid grid-cols-2 gap-3 my-5 p-3 border rounded-lg"
              key={index}>
              <div className="col-span-2">
                <label className=" text-xs ">University Name</label>
                <Input
                  type="text"
                  name="universityName"
                  defaultValue={education.universityName}
                  value={education.universityName}
                  onChange={(event) => handleChange(event, index)}
                  className=" w-full p-2 border rounded"
                />
              </div>
              <div className="">
                <label className=" text-xs ">Degree</label>
                <Input
                  type="text"
                  name="degree"
                  defaultValue={education.degree}
                  value={education.degree}
                  onChange={(event) => handleChange(event, index)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="">
                <label className=" text-xs ">Major</label>
                <Input
                  type="text"
                  name="major"
                  defaultValue={education.major}
                  value={education.major}
                  onChange={(event) => handleChange(event, index)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="">
                <label className=" text-xs ">Start Date</label>
                <Input
                  type="number"
                  placeholder="YYYY"
                  name="startDate"
                  defaultValue={education.startDate}
                  value={education.startDate}
                  onChange={(event) => handleChange(event, index)}
                  className="w-full p-2 border rounded"
                  min="1900"
                  max="9999"
                />
                {/* <Input
                  type="date"
                  name="startDate"
                  defaultValue={education.startDate}
                  value={education.startDate}
                  onChange={(event) => handleChange(event, index)}
                  className="w-full p-2 border rounded"
                /> */}
              </div>
              <div className="">
                <label className=" text-xs ">End State</label>
                <Input
                  type="number"
                  placeholder="YYYY"
                  name="endDate"
                  defaultValue={education.endDate}
                  value={education.endDate}
                  onChange={(event) => handleChange(event, index)}
                  className="w-full p-2 border rounded"
                  min="1900"
                  max="9999"
                />
                {/* <Input
                  type="date"
                  name="endDate"
                  defaultValue={education.endDate}
                  value={education.endDate}
                  onChange={(event) => handleChange(event, index)}
                  className="w-full p-2 border rounded"
                  min="1900"
                  max="9999"
                /> */}
              </div>
              <div className="col-span-2">
                <label className=" text-xs ">Description</label>
                <RichTextEditor
                  index={index}
                  defaultValue={education.description}
                  onRichTextEditorChange={(event) =>
                    handleRichTextEditor(event, "description", index)
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-primary"
              onClick={AddNewEducation}>
              + Add More Education
            </Button>
            <Button
              variant="outline"
              className="text-primary"
              onClick={RemoveEducation}>
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

export default Education;
