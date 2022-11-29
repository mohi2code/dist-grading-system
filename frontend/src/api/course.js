import { useCallback, useState } from "react";
import { makeAuthorizationHeader } from "./utils";

export const fetchCourses = async (options) => {
  const response = await fetch(`/api/courses/`, {
    ...options,
  });
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = (data && data.message) || response.status;
    throw error;
  }

  return data;
}

export function useFetchCourses() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (token) => {
    try {
      setIsLoading(true);
      const courses = await fetchCourses({ ...makeAuthorizationHeader(token) });
      setData(courses);
      setIsLoading(false);
      return courses;
    } catch (error) {
      setIsLoading(false);
      setError(error);
      throw error;
    }
  };

  return {
    data,
    error,
    isLoading,
    execute: useCallback(execute, [])
  };
}

export const fetchCoursesByInstructor = async (id, options) => {
  const response = await fetch(`/api/courses?instructor=${id}`, {
    ...options,
  });
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = (data && data.message) || response.status;
    throw error;
  }

  return data;
}

export const useFetchCourseByInstructor = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (id, token) => {
    try {
        setIsLoading(true)
        const courses = await fetchCoursesByInstructor(id, {...makeAuthorizationHeader(token)});
        setData(courses);
        setIsLoading(false)
        return courses;
    } catch (error) {
        setIsLoading(false)
        setError(error)
        throw error
    }
  }

  return {
    data,
    error,
    isLoading,
    execute: useCallback(execute, [])
  };
}

export const fetchCourseById = async (id, options) => {
  const response = await fetch(`/api/courses/${id}`, {
    ...options,
  });
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = (data && data.message) || response.status;
    throw error;
  }

  return data;
}

export const useFetchCourseById = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (id, token) => {
    try {
        setIsLoading(true)
        const course = await fetchCourseById(id, {...makeAuthorizationHeader(token)});
        setData(course);
        setIsLoading(false)
        return course;
    } catch (error) {
        setIsLoading(false)
        setError(error)
        throw error
    }
  }

  return {
    data,
    error,
    isLoading,
    execute: useCallback(execute, [])
  };
}

export const createCourse = async (reqBody, options) => {
  const response = await fetch(`/api/courses/`, {
    body: JSON.stringify(reqBody),
    ...options
  });
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = (data && data.message) || response.status;
    throw error;
  }

  return data;
}

export const useCreateCourse = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const execute = async (token, reqBody, options = { 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }, 
  }) => {
      try {
          setIsLoading(true)
          const course = await createCourse(reqBody, options)
          setData(course)
          setIsLoading(false)
          return course
      } catch (error) {
          setIsLoading(false)
          setError(error)
          throw error
      }
  }

  return {
      data,
      error, 
      isLoading,
      execute: useCallback(execute, [])
  }
}

export const updateExperts = async (id, reqBody, options) => {
  const response = await fetch(`/api/courses/${id}/experts`, {
    body: JSON.stringify(reqBody),
    ...options
  });
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = (data && data.message) || response.status;
    throw error;
  }

  return data;
}

export const useUpdateExperts = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const execute = async (id, token, reqBody, options = { 
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }, 
  }) => {
      try {
          setIsLoading(true)
          const course = await updateExperts(id, reqBody, options)
          setData(course)
          setIsLoading(false)
          return course
      } catch (error) {
          setIsLoading(false)
          setError(error)
          throw error
      }
  }

  return {
      data,
      error, 
      isLoading,
      execute: useCallback(execute, [])
  }
}

