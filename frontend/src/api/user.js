import { useState, useCallback } from "react";
import { makeAuthorizationHeader } from "./utils";

export const login = async (reqBody, options) => {
  const response = await fetch('/auth/login/', {
    ...options,
    body: JSON.stringify(reqBody)
  });
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = (data && data.message) || response.status;
    throw error;
  }

  return data;
}

export const useLogin = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (reqBody, options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json' }
  }) => {
    try {
      setIsLoading(true)
      const data = await login(reqBody, options)
      setData(data)
      setStatus(data.status || 200)
      setIsLoading(false)
      return data
    } catch (error) {
      setIsLoading(false)
      setError(error)
      throw error
    }
  }

  return {
    data,
    status,
    error,
    isLoading,
    execute: useCallback(execute, [])
  }
}

export const register = async (reqBody, options) => {
  const response = await fetch('/auth/register/', {
    ...options,
    body: JSON.stringify(reqBody)
  });
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = (data && data.message) || response.status;
    throw error;
  }

  return data;
}

export const useRegister = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (reqBody, options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json' }
  }) => {
    try {
      setIsLoading(true)
      const data = await register(reqBody, options)
      setData(data)
      setStatus(data.status || 200)
      setIsLoading(false)
      return data
    } catch (error) {
      setIsLoading(false)
      setError(error)
      throw error
    }
  }

  return {
    data,
    status,
    error,
    isLoading,
    execute: useCallback(execute, [])
  }
}

export const fetchUsersByRole = async (role, options) => {
  const response = await fetch(`/api/users/?role=${role}`, {
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

export const useFetchUsersByRole = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (role, token) => {
    try {
        setIsLoading(true)
        const users = await fetchUsersByRole(role, {...makeAuthorizationHeader(token)});
        setData(users);
        setIsLoading(false)
        return users;
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
