import React from "react";
import {
  Aws,
  Clickup,
  Figma,
  Slack,
  Notion,
  Flutter,                                                                               
  Zoom,
  VSCode,
} from "@/app/components";
import styles from "@/app/features/home/styles/home.module.css";
interface Tool {
  name: string;
  icon: React.ReactNode;
}

const tools: Tool[] = [
  { name: "Aws", icon: <Aws /> },
  { name: "Clickup", icon: <Clickup /> },
  { name: "Notion", icon: <Notion /> },
  { name: "Flutter", icon: <Flutter /> },
  { name: "Figma", icon: <Figma /> },
  // { name: "Zoom", icon: <Zoom /> },
  { name: "vscode", icon: <VSCode /> },
  { name: "Slack", icon: <Slack /> },
];

  export default function ToolsWeUse() {
  return (
    <section className="text-blue-80 pb-[4.25rem]">
      <p className="text-center text-lg mb-14">
        Master cutting-edge industry-standard tools
      </p>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderTrack}>
          {tools.concat(tools).map((tool, index) => (
            <div
              key={index}
              className={`${styles.sliderItem} flex items-center justify-center`}
            >
              {tool.icon}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
