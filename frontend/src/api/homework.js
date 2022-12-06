import { useState, useCallback } from "react";
import { makeAuthorizationHeader } from "./utils";

export const fetchHomeworksByCourse = async (id, options) => {
  const response = await fetch(`/api/homeworks?course_id=${id}`, {
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

export const useFetchHomeworksByCourse = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (id, token) => {
    try {
        setIsLoading(true)
        const homeworks = await fetchHomeworksByCourse(id, {...makeAuthorizationHeader(token)});
        setData(homeworks);
        setIsLoading(false)
        return homeworks;
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

export const fetchHomeworkById = async (id, options) => {
  const response = await fetch(`/api/homeworks/${id}`, {
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

export const useFetchHomworkById = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (id, token) => {
    try {
        setIsLoading(true)
        const course = await fetchHomeworkById(id, {...makeAuthorizationHeader(token)});
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

export const updateHomework = async (id, reqBody, options) => {
  const response = await fetch(`/api/homeworks/${id}`, {
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

export const useUpdateHomework = () => {
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
      const course = await updateHomework(id, reqBody, options)
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

export const fetchHomeworkGroup = async (id, options) => {
  const response = await fetch(`/api/homeworks/${id}/group`, {
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

export const useFetchHomworkGroup = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (id, token) => {
    try {
        setIsLoading(true)
        const course = await fetchHomeworkGroup(id, {...makeAuthorizationHeader(token)});
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

export const createHomeworkGroup = async (id, options) => {
  const response = await fetch(`/api/homeworks/${id}/group`, {
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

export const useCreateHomeworkkGroup = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (id, token, options={
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }, 
  }) => {
    try {
        setIsLoading(true)
        const group = await createHomeworkGroup(id, options);
        setData(group);
        setIsLoading(false)
        return group;
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
