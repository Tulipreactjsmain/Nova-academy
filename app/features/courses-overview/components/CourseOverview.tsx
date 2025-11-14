import React from "react";
import styles from "@/app/features/courses/styles/CourseOverview.module.css"
interface CourseOverviewProps {
  overview: string;
  learningOutcomes: string[];
}

const CourseOverview: React.FC<CourseOverviewProps> = ({
  overview,
  learningOutcomes,
}) => {
  return (
    <div className="max-w-[1058px] ml-auto ">
      <p className="text-blue-80 text-lg">{overview}</p>
      <h2 className="text-blue-80 text-2xl font-bold mt-8">
        Learning Outcomes
      </h2>
      <p className="text-blue-80 text-lg my-6">At the end of this course, you would be able to:</p>
      <ul className="list-disc max-w-[587px] ml-[69px]">
        {learningOutcomes.map((outcome, index) => (
          <li key={index} className="text-blue-80 text-lg leading-5 mt-4">
            {outcome}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseOverview;
