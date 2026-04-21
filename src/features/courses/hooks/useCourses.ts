// src/features/courses/hooks/useCourses.ts
import {  CourseFilterState } from "../types";
import { useState, useMemo } from "react";
import { MOCK_COURSES } from "../constants";

export function useCourses() {
  const [filters, setFilters] = useState<CourseFilterState>({
    level: '',
    search: '',
  });
  const courses = useMemo(() => {
    return MOCK_COURSES.filter((c) => {
      const matchLevel = filters.level === '' || c.level === filters.level;
      const matchSearch = c.title.toLowerCase().includes(filters.search.toLowerCase());
      return matchLevel && matchSearch;
    });
  }, [filters]);

  return { courses, filters, setFilters };
}