import { useState } from "react";

import useReports from "../../hooks/useReports";

import RescueList from "../../components/Rescue/RescueList";
import RescueLoading from "../../components/Rescue/RescueLoading";
import RescueEmpty from "../../components/Rescue/RescueEmpty";
import RescueFilters from "../../components/Rescue/RescueFilters";

import "../../components/Rescue/RescueFeed.css";

export default function RescueFeedScreen() {
  const [filters, setFilters] = useState({});

  const {
    data,
    isLoading,
    isError,
    error,
  } = useReports(filters);

  if (isLoading) {
    return <RescueLoading />;
  }

  if (isError) {
    return (
      <div className="rescue-error">
        {error.message}
      </div>
    );
  }

  const reports = data || [];

  return (
    <div className="rescue-feed-page">

      <div className="rescue-header">

        <h1>Live Rescue Feed</h1>

        <p>
          Nearby animals needing help.
        </p>

      </div>

      <RescueFilters
        filters={filters}
        setFilters={setFilters}
      />

      {reports.length === 0 ? (
        <RescueEmpty />
      ) : (
        <RescueList reports={reports} />
      )}

    </div>
  );
}
