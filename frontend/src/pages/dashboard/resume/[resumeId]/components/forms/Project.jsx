import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { Input } from "@/components/ui/input";
import useGetResume from "@/useHooks/useResume";
import { useParams } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { MultiSelectInputProject } from "../MultiSelectInput";

const initialFormDetails = {
  projectName: "",
  technologies: [],
  githubLink: "",
  description: "",
};

function Project({ enableNext }) {
  const [projectList, setProjectList] = useState([initialFormDetails]);
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
    resumeInfo?.project.length > 0 && setProjectList(resumeInfo.project);
  }, []);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const newProjectList = [...projectList];
    newProjectList[index][name] = value;
    setProjectList(newProjectList);
  };

  const AddNewProject = () => {
    setProjectList([...projectList, initialFormDetails]);
  };

  const RemoveProject = () => {
    setProjectList(projectList.slice(0, -1));
  };

  const handleRichTextEditor = (event, name, index) => {
    const newProjectList = [...projectList];
    newProjectList[index][name] = event.target.value;
    setProjectList(newProjectList);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      project: projectList,
    });
  }, [projectList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Project</h2>
      <p>Add your project details</p>
      <form onSubmit={onSave}>
        <div className="">
          {projectList.map((project, index) => (
            <div
              className="grid grid-cols-2 gap-3 my-5 p-3 border rounded-lg"
              key={index}>
              <div className="">
                <label className=" text-xs ">Project Name</label>
                <Input
                  type="text"
                  name="projectName"
                  value={project.projectName}
                  onChange={(event) => handleChange(event, index)}
                  className=" w-full p-2 border rounded"
                />
              </div>
              <div className="">
                <label className=" text-xs ">Github Link</label>
                <Input
                  type="text"
                  name="githubLink"
                  value={project.githubLink}
                  onChange={(event) => handleChange(event, index)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="col-span-2">
                <MultiSelectInputProject
                  content={project}
                  contentList={projectList}
                  setContentList={setProjectList}
                  fieldKey="technologies"
                  label="Tech Stack"
                  index={index}
                />
              </div>
              <div className="col-span-2">
                <label className=" text-xs ">Description</label>
                <RichTextEditor
                  index={index}
                  defaultValue={project.description}
                  onRichTextEditorChange={(event) =>
                    handleRichTextEditor(event, "description", index)
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
              onClick={AddNewProject}>
              + Add More Project
            </Button>
            <Button
              variant="outline"
              className="text-primary"
              onClick={RemoveProject}>
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

export default Project;
