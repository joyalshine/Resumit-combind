import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import useGetResume from "@/useHooks/useResume";
import { toast } from "@/components/ui/use-toast";
function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const navigate = useNavigate();
  const { createResume } = useGetResume();

  const onCreate = async () => {
    setLoading(true);

    try {
      const { status, data } = await createResume(resumeTitle);

      console.log(status, data);

      if (status == "success") {
        navigate(`resume/${data._id}/edit`);
      }
    } catch (err) {
      console.log(err);
    }
    // navigate("/dashboard/resume/67289/edit");
    setLoading(false);
  };

  return (
    <div>
      <div
        onClick={() => setOpenDialog(true)}
        className="p-14 py-14 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed">
        <PlusSquare />
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-bold text-xl">
              Create a new Resume
            </DialogTitle>
            <DialogDescription>
              <p>add new title for your resume</p>
              <Input
                className="my-2"
                placeholder="Ex.Full Stack Developer"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button
                variant="ghost"
                onClick={() => {
                  setOpenDialog(false);
                }}>
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || isLoading}
                onClick={() => {
                  onCreate();
                }}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  "Create Resume"
                )}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
