import { coursesByStatus, type Course, mockCourses } from "@/lib/mock-data/courses";
// Legacy API functions updated to work with mock data

export async function fetchCoursesByStatus(status: string): Promise<Course[]> {
  try {
    // Map API status names to mock data keys
    const statusMap: Record<string, keyof typeof coursesByStatus> = {
      "AVAILABLE": "available",
      "IN_PROGRESS": "inProgress", 
      "NOT_STARTED": "notStarted",
      "PAUSED": "paused",
      "ABANDONED": "abandoned",
      "COMPLETED": "completed"
    };
    
    const dataKey = statusMap[status.toUpperCase()] || "available";
    return coursesByStatus[dataKey] || [];
  } catch (error) {
    console.error(`Error fetching courses with status ${status}:`, error);
    return [];
  }
}

export async function fetchCourseById(courseId: string): Promise<Course | null> {
  try {
    // Find course in mock data by ID
    const course = mockCourses.find(c => c.id.toString() === courseId);
    
    if (!course) {
      console.warn(`Course ${courseId} not found.`);
      return null;
    }
    
    return course;
  } catch (error) {
    console.error(`Error fetching course ${courseId}:`, error);
    return null;
  }
}