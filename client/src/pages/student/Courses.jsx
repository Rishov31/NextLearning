import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
 
const Courses = () => {
  const {data, isLoading, isError} = useGetPublishedCourseQuery(); //useGetPublishedCourseQuery()-> Performs an API request to fetch the published courses..data-> Contains the API response (e.g., a list of published courses).
 
  if(isError) return <h1>Some error occurred while fetching courses.</h1>

  return (
    <div className="bg-gray-50 dark:bg-[#141414]">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (  //jodi isLoading true hoy then amra loading skeleton diye debo which are imported from shadcn-ui
            Array.from({ length: 8 }).map((_, index) => ( //ekhane 8 bar oi box type er skeleton ke display korabo tai map kore pathalam..
              <CourseSkeleton key={index} />
            ))
          ) : ( //jodi loading hoyejai then display the courses-- which is (means course) imported from course.jsx
            //If data?.courses exists (i.e., it is not undefined or null), iterate over the array data.courses and render a <Course /> component for each item in the array.
           data?.courses && data.courses.map((course, index) => <Course key={index} course={course}/>) //The part course={course} is a prop being passed to the Course component.
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {   //This is for showing loading skeleton which is imported form shadcn-ui
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
