import React from "react";
import { ApiCourse } from "@/types/types";
import { fetchCoursesByStatus } from "@/lib/api/course-api";
import { fetchLearnerDashboard } from "@/lib/api/learner-dashboard-api";
import { fetchAvailableCourses } from "@/lib/api/available-courses-api";
import CourseCatalogClient from "./CourseCatalog";

export type CoursesByStatus = Record<string, ApiCourse[]>;

interface CourseContentProps {
  role?: string;
}

export default async function CourseContent({ role }: CourseContentProps) {
  const isStudent = role === "Student";

  async function fetchAdminCourses() {
    const [draft, published, archived, underReview, rejected] = await Promise.all([
      fetchCoursesByStatus("DRAFT"),
      fetchCoursesByStatus("PUBLISHED"),
      fetchCoursesByStatus("ARCHIVED"),
      fetchCoursesByStatus("UNDER_REVIEW"),
      fetchCoursesByStatus("REJECTED"),
    ]);
    return {
      draft,
      published,
      archived,
      underReview,
      rejected,
    } as CoursesByStatus;
  }

  async function fetchStudentCourses() {
    // Fetch both dashboard data and available courses for students
    const [dashboardData, availableCoursesData] = await Promise.all([
      fetchLearnerDashboard(),
      fetchAvailableCourses(),
    ]);

    const mapEnrollmentsToCourses = (enrollments?: Array<{ quest: ApiCourse }>) => 
      (enrollments ?? []).map((e) => e.quest);

    return {
      available: availableCoursesData?.available_courses || [],
      inProgress: mapEnrollmentsToCourses(dashboardData?.in_progress_quests),
      notStarted: mapEnrollmentsToCourses(dashboardData?.not_started_quests),
      paused: mapEnrollmentsToCourses(dashboardData?.paused_quests),
      abandoned: mapEnrollmentsToCourses(dashboardData?.abandoned_quests),
      completed: mapEnrollmentsToCourses(dashboardData?.completed_quests),
    } as CoursesByStatus;
  }

  // Fetch courses depending on role
  const coursesByStatus = isStudent ? await fetchStudentCourses() : await fetchAdminCourses();
  console.log("-------------- Courses by status:", coursesByStatus);

  return <CourseCatalogClient coursesByStatus={coursesByStatus} role={role} />;
}