"use client";

import CourseTemplate from "@/templates/CourseTemplate";
import { useParams } from "next/navigation";

export default function Course() {
  const { slug } = useParams();

  return <CourseTemplate slug={slug as string} />;
}
