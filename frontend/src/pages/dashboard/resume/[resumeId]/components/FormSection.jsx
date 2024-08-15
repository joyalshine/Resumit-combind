import React, { useState } from "react";
import PersonalForm from "./forms/PersonalForm";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import SkillForm from "./forms/SkillForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import Project from "./forms/Project";
import { Navigate, useParams } from "react-router-dom";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const params = useParams();

  return (
    <div>
      <div className="flex justify-end items-center">
        {/* <Button varient="outline" size="sm" className="flax gap-2">
          <LayoutGrid /> Theme
        </Button> */}
        <div className="flex gap-2" size="sm">
          {activeFormIndex > 1 && (
            <Button
              className=""
              size="sm"
              onClick={() => {
                setActiveFormIndex(activeFormIndex - 1);
              }}>
              <ArrowLeft />
            </Button>
          )}
          <Button
            className="flex gap-2"
            size="sm"
            disabled={!enableNext}
            onClick={() => {
              setActiveFormIndex(activeFormIndex + 1);
              setEnableNext(false);
            }}>
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {activeFormIndex == 1 ? (
        <PersonalForm
          enableNext={(v) => {
            setEnableNext(v);
          }}
        />
      ) : activeFormIndex == 2 ? (
        <Education
          enableNext={(v) => {
            setEnableNext(v);
          }}
        />
      ) : activeFormIndex == 3 ? (
        <Experience
          enableNext={(v) => {
            setEnableNext(v);
          }}
        />
      ) : activeFormIndex == 4 ? (
        <Project
          enableNext={(v) => {
            setEnableNext(v);
          }}
        />
      ) : activeFormIndex == 5 ? (
        <SkillForm
          enableNext={(v) => {
            setEnableNext(v);
          }}
        />
      ) : activeFormIndex == 6 ? (
        <Navigate to={"/resume/" + params.resumeId + "/view"} />
      ) : null}
    </div>
  );
}

export default FormSection;
