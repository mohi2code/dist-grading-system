import { useState, useCallback } from "react";
import { makeAuthorizationHeader } from "./utils";

export const fetchBySubmitter = async (homework_id, submitted_by, options) => {
  const response = await fetch(`/api/submissions?homework_id=${homework_id}&submitted_by=${submitted_by}`, {
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

export const useFetchBySubmitter = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (homework_id, submitted_by, token) => {
    try {
      setIsLoading(true)
      const submissions = await fetchBySubmitter(homework_id, submitted_by, {...makeAuthorizationHeader(token)});
      setData(submissions[0]);
      setIsLoading(false)
      return submissions[0];
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

export const fetchByHomework = async (homework_id, options) => {
  const response = await fetch(`/api/submissions?homework_id=${homework_id}`, {
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

export const useFetchByHomework = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (homework_id, token) => {
    try {
      setIsLoading(true)
      const submissions = await fetchByHomework(homework_id, {...makeAuthorizationHeader(token)});
      setData(submissions);
      setIsLoading(false)
      return submissions;
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

export const fetchSubmissionById = async (id, options) => {
  const response = await fetch(`/api/submissions/${id}`, {
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

export const useFetchSubmissionById = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (id, token) => {
    try {
      setIsLoading(true)
      const submission = await fetchSubmissionById(id, {...makeAuthorizationHeader(token)});
      setData(submission);
      setIsLoading(false)
      return submission;
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

export const submitHomework = async (reqBody, options) => {
  const response = await fetch(`/api/submissions/`, {
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

export const useSubmitHomework = () => {
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
      const course = await submitHomework(reqBody, options)
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

export const gradeSubmission = async (id, reqBody, options) => {
  const response = await fetch(`/api/submissions/${id}`, {
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

export const useGradeSubmission = () => {
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
      const course = await gradeSubmission(id, reqBody, options)
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

export const objectGrade = async (id, reqBody, options) => {
  const response = await fetch(`/api/submissions/${id}/object`, {
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

export const useObjectGrade = () => {
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
      const course = await objectGrade(id, reqBody, options)
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
