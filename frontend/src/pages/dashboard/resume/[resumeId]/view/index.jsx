import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import ResumePreview from "../components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import useGetResume from "@/useHooks/useResume";
import { useParams } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import Navbar from "@/components/NavBar/NavBar";

function ViewResume() {
  const params = useParams();
  const { fetchResume } = useGetResume();
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const { fetchResumebyResumeId } = useGetResume();
  const [resumeInfo, setResumeInfo] = useState(async () => {
    const { status, resume } = await fetchResumebyResumeId(params.resumeId);
    return resume;
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { status, resume } = await fetchResumebyResumeId(params.resumeId);
    setResumeInfo(resume);
  };

  const handleDownLoad = () => {
    window.print();
  };

  return (
    <>
      <Navbar />

      <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
        <div id="topnav" className="my-10 mx-10  md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats ! Your Resume has been compelety made{" "}
          </h2>
          <p className="text-center text-gray-500">
            Now you can download your resume{" "}
          </p>
          <div className="flex justify-between lg:mx-48 my-10">
            <Button onClick={handleDownLoad}>Download</Button>
            <Button>Share</Button>
          </div>
        </div>
        <div
          id="print-area-parent"
          ref={targetRef}
          className="my-10 mx-10 lg:mx-36 md:mx-20">
          <div id="print-area">
            <ResumePreview />
          </div>
        </div>
      </ResumeInfoContext.Provider>
    </>
  );
}

export default ViewResume;
