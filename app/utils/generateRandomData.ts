import { Course } from "@/app/features/courses/slice/courseSlice";
import { Cohort } from "@/app/features/admin/slice/allCohortSlice";

const randomTitles = [
  "Web Development",
  "Machine Learning",
  "UI/UX",
  "Blockchain",
  "Data Science",
  "Mobile Development",
  "Cloud Computing",
  "Cybersecurity",
  "Artificial Intelligence",
  "Full Stack",
];

const randomDescriptions = [
  "Learn the basics of web development and create your first website.",
  "Dive deep into advanced machine learning algorithms and techniques.",
  "Master the principles of user interface and user experience design.",
  "Understand the fundamentals of blockchain technology and its applications.",
  "Get started with data science and learn to analyze complex datasets.",
  "Build cross-platform mobile apps using React Native framework.",
  "Explore cloud computing concepts and popular cloud platforms.",
  "Discover essential cybersecurity practices to protect digital assets.",
  "Understand AI concepts and implement them in real-world scenarios.",
  "Become a full stack developer using JavaScript and modern frameworks.",
];

const randomDurations = [
  "4 weeks",
  "6 weeks",
  "8 weeks",
  "10 weeks",
  "12 weeks",
];
const randomModesOfLearning = [
  "Self-paced",
  "Instructor-led",
  "Blended",
  "Live online",
];
const randomSkillLevels = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "All levels",
];
const randomRequirements = [
  "No prior experience needed",
  "Basic programming knowledge",
  "Familiarity with web technologies",
  "Understanding of data structures",
];
const randomInstructors = [
  "Dr. Jane Smith",
  "Prof. John Doe",
  "Sarah Johnson, PhD",
  "Michael Brown, Industry Expert",
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateRandomCourseData(): Omit<Course, "_id"> {
  const baseTitle = getRandomElement(randomTitles);
  const courseNumber = Math.floor(Math.random() * 1000) + 1;
  const title = `Generated Course-${courseNumber}`;
  const slug = title.toLowerCase().replace(/\s+/g, "-");

  return {
    title,
    description: `${baseTitle}: ${getRandomElement(randomDescriptions)}`,
    learningOutcomes: [
      "Understand key concepts and principles",
      "Apply learned skills to real-world projects",
      "Develop problem-solving abilities in the field",
    ],
    duration: getRandomElement(randomDurations),
    modeOfLearning: getRandomElement(randomModesOfLearning),
    skillLevel: getRandomElement(randomSkillLevels),
    requirements: getRandomElement(randomRequirements),
    instructors: getRandomElement(randomInstructors),
    price: {
      current: Math.floor(Math.random() * (500 - 50) + 50),
      original: Math.floor(Math.random() * (1000 - 500) + 500),
    },
    image: `https://picsum.photos/seed/${Math.random()}/800/600`,
    slug,
  };
}

interface CourseEntry {
  courseId: string;
  maxSlots: number;
}

export function generateRandomCohortData() {
  return {
    name: `Cohort-${Date.now().toString()}`,
    description: `Cohort for ${Date.now().toString()}`,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: "upcoming",
    instructors: [getRandomElement(randomInstructors)],
    enrolledStudents: 0,
    courses: [] as CourseEntry[],
  };
}
