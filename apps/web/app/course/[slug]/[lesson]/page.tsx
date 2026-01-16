"use client";

import CourseTemplate from "@/templates/CourseTemplate";
import { useParams, useSearchParams } from "next/navigation";

export default function Course() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const moduleName = searchParams.get("module");

  if (!moduleName) {
    return null;
  }

  return <CourseTemplate slug={slug as string} moduleName={moduleName} />;
}
