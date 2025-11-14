import React from "react";
import Image from "next/image";
import { Layout } from "@/app/components";
import styles from "../styles/team.module.css";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Solomon Adesanya",
    role: "MD <strong>NOVA Global Learning Solutions</strong>",
    image:
      "https://res.cloudinary.com/techbro/image/upload/v1729185574/Frame_1321316978_ipiamc.png",
  },
  {
    name: "Fayokemi Akintunde",
    role: "Head, Internships",
    image:
      "https://res.cloudinary.com/techbro/image/upload/v1744647051/Frame_1321317059_2_zl2a6r.png",
  },
  {
    name: "Mofeyifoluwa Adepitan",
    role: `Head, Learning & innovation`,
    image:
      "https://res.cloudinary.com/techbro/image/upload/v1729185574/Frame_1321317019_f7bsct.png",
  },
  {
    name: "Temitope Alice",
    role: "Head, operations & student experience",
    image:
      "https://res.cloudinary.com/techbro/image/upload/v1729185575/Frame_1321316974_yqlyyk.png",
  },
  {
    name: "Miracle Arinze",
    role: "Head, technology & platforms",
    image:
      "https://res.cloudinary.com/techbro/image/upload/v1729185576/Frame_1321317022_cepv8j.png",
  },
];

const TeamMemberCard: React.FC<TeamMember> = ({ name, role, image }) => (
  <div className={styles.teamMember}>
    <div className={styles.imageWrapper}>
      <Image
        src={image}
        alt={name}
        width={210}
        height={181}
        className={styles.memberImage}
      />
    </div>
    <div className={styles.memberInfo}>
      <h3 className="text-xl font-semibold text-blue-80">{name}</h3>
      <p className="text-blue-80" dangerouslySetInnerHTML={{ __html: role }} />
    </div>
  </div>
);

export default function Team() {
  return (
    <section className="py-[4.25rem]">
      <Layout>
        <h2 className="text-5xl font-semibold text-blue-80 mb-12 text-center">
          Meet Our Team
        </h2>
        <div className={styles.teamContainer}>
          <div className={`${styles.row} ${styles.twoMembers}`}>
            {teamMembers.slice(0, 2).map((member, index) => (
              <TeamMemberCard key={index} {...member} />
            ))}
          </div>
          <div className={`${styles.row} ${styles.threeMembers}`}>
            {teamMembers.slice(2, 5).map((member, index) => (
              <TeamMemberCard key={index + 2} {...member} />
            ))}
          </div>
          <div className={`${styles.row} ${styles.twoMembers}`}>
            {teamMembers.slice(5, 7).map((member, index) => (
              <TeamMemberCard key={index + 5} {...member} />
            ))}
          </div>
          <div className={`${styles.row} ${styles.threeMembers}`}>
            {teamMembers.slice(7).map((member, index) => (
              <TeamMemberCard key={index + 7} {...member} />
            ))}
          </div>
        </div>
      </Layout>
    </section>
  );
}
