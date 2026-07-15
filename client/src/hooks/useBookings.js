import { useCallback, useEffect, useMemo, useState } from "react";

import { getBookings } from "../api/booking.api";
import useDebounce from "./useDebounce";

const DEFAULT_FILTERS = {
  search: "",
  status: "",
  serviceType: "",
  page: 1,
  limit: 10,
};

const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const [loading, setLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [error, setError] = useState(null);

  const debouncedSearch = useDebounce(filters.search, 400);

  const requestParams = useMemo(
    () => ({
      ...filters,
      search: debouncedSearch,
    }),
    [filters, debouncedSearch]
  );

  const fetchBookings = useCallback(
    async (params) => {
      try {
        setLoading(true);
        setError(null);

        const response = await getBookings(params);

        setBookings(response.data.bookings);
        setPagination(response.data.pagination);
      } catch (requestError) {
        setError(
          requestError?.response?.data?.message ??
          "Unable to load bookings. Please try again."
        );
      } finally {
        setLoading(false);
        setHasLoadedOnce(true);

      }
    },
    []
  );

useEffect(() => {
  fetchBookings(requestParams);
}, [fetchBookings, requestParams]);

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
  return fetchBookings(requestParams);
}, [fetchBookings, requestParams]);

  return {
    bookings,
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

export default useBookings;