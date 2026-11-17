import { useCallback, useEffect, useRef, useMemo, useState } from "react";

import { getUsers } from "../api/user.api";
import useDebounce from "./useDebounce";

const DEFAULT_FILTERS = {
  search: "",
  role: "",
  isActive: "",
  page: 1,
  limit: 10,
};

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const [loading, setLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [error, setError] = useState(null);

  const debouncedSearch = useDebounce(filters.search, 500);

  const abortControllerRef = useRef(null);

  const requestParams = useMemo(
    () => ({
      ...filters,
      search: debouncedSearch,
    }),
    [filters, debouncedSearch]
  );

  const fetchUsers = useCallback(
    async (params) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        setLoading(true);
        setError(null);

        const response = await getUsers(params, controller.signal);

        setUsers(response.data.users);
        setPagination(response.data.pagination);
      } catch (requestError) {
        if (
          requestError.name === "CanceledError" ||
          requestError.code === "ERR_CANCELED"
        ) {
          return;
        }

        setError(
          requestError?.response?.data?.message ??
          "Unable to load users. Please try again."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
          setHasLoadedOnce(true);
        }
      }
    },
    []
  );

  useEffect(() => {
    fetchUsers(requestParams);
  }, [fetchUsers, requestParams]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const updateFilters = useCallback((updates) => {
    setFilters((previous) => ({
      ...previous,
      ...updates,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const refetch = useCallback(() => {
    return fetchUsers(requestParams);
  }, [fetchUsers, requestParams]);

  return {
    users,
    pagination,
    filters,
    loading,
    initialLoading: loading && !hasLoadedOnce,
    error,
    updateFilters,
    resetFilters,
    refetch,
  };
};

export default useUsers;