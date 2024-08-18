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
import { WEBSITE_URL } from "@/assets/dataAssets";
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

      if (status == "success") {
        navigate(`../resume/${data._id}/edit`, { relative: "path" });
      }
    } catch (err) {
    }
    // navigate("/dashboard/resume/67289/edit");
    setLoading(false);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpenDialog(true)}
        class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2">
        Resume       
      </button>

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
