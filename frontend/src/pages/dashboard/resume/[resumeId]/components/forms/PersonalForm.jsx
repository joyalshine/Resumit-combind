import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import useGetResume from "@/useHooks/useResume";
import { Loader2 } from "lucide-react";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

function PersonalForm({ enableNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState();
  const { updateResume } = useGetResume();

  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };


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
      description: "Personal Deatils Updated",
    });
    enableNext(true);
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal</h2>
      <p>Get Started with the basic information</p>
      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div className="">
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              required
              defaultValue={resumeInfo.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="">
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              required
              defaultValue={resumeInfo.lastName}
              onChange={handleInputChange}
            />
          </div>

          <div className="">
            <label className="text-sm">Github</label>
            <Input
              name="githubLink"
              required
              defaultValue={resumeInfo.githubLink}
              onChange={handleInputChange}
            />
          </div>
          <div className="">
            <label className="text-sm">Linked</label>
            <Input
              name="LinkedinLink"
              required
              defaultValue={resumeInfo.LinkedinLink}
              onChange={handleInputChange}
            />
          </div>
          <div className="">
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              required
              defaultValue={resumeInfo.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="">
            <label className="text-sm">Email</label>
            <Input
              name="email"
              required
              defaultValue={resumeInfo.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalForm;
