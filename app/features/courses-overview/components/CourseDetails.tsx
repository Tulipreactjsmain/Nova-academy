import React from "react";
interface CourseDetailsProps {
  details: {
    duration: string;
    mode: string;
    skillLevel: string;
    classFrequency: string;
    requirements: string;
    instructor: string | undefined;
    certificate: string;
    projects: string;
  };
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ details }) => {
  return (
    <div className="max-w-[1058px] ml-auto grid grid-cols-2 md:grid-cols-3 gap-14 mb-[20px]">
      {Object.entries(details).map(([key, value], index) => (
        <div key={index} className="text-blue-80 text-md text-center">
          <h1
            style={{ width: "fit-content" }}
            className="inline-block bg-blue-900 text-white text-center py-2 px-4 rounded-full"
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </h1>
          <p className=" mt-2 ">{value}</p>
        </div>
      ))}
    </div>
  );
};

export default CourseDetails;
