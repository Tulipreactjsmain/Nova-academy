import Cohort from "@/models/Cohort";

export interface CourseAvailability {
  canPurchase: boolean;
  currentCohort?: {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
  };
  nextCohort?: {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
  };
  message: string;
}

export async function checkCourseAvailability(
  courseId: string
): Promise<CourseAvailability> {
  const now = new Date();

  // Find current or upcoming cohort with this course
  const cohort = await Cohort.findOne({
    "courses.courseId": courseId,
    endDate: { $gte: now },
  }).sort({ startDate: 1 });

  if (!cohort) {
    return {
      canPurchase: false,
      message: "No upcoming cohorts available for this course",
    };
  }

  // Current cohort logic
  if (cohort.startDate <= now && cohort.endDate >= now) {
    return {
      canPurchase: true,
      currentCohort: {
        id: cohort._id,
        name: cohort.name,
        startDate: cohort.startDate,
        endDate: cohort.endDate,
      },
      message: "Course available in current cohort",
    };
  }

  // Future cohort logic
  if (cohort.startDate > now) {
    return {
      canPurchase: true,
      currentCohort: {
        id: cohort._id,
        name: cohort.name,
        startDate: cohort.startDate,
        endDate: cohort.endDate,
      },
      nextCohort: cohort.nextStartDate
        ? {
            id: cohort._id,
            name: cohort.nextCohortName,
            startDate: cohort.nextStartDate,
            endDate: cohort.nextEndDate,
          }
        : undefined,
      message: "Course available in upcoming cohort",
    };
  }

  return {
    canPurchase: false,
    message: "Course not available for enrollment",
  };
}
