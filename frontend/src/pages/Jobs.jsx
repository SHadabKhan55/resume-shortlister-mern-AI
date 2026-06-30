import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await axios.get("http://localhost:4000/get-job");
        setJobs(res.data.jobs);
        console.log(res.data.jobs)
      } catch (error) {
        console.log(error);
      }
    }

    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Available Jobs</h1>

      {jobs.map((job) => (
        <div key={job._id}>
          <h2>{job.title}</h2>
          <p>{job.description}</p>

          <button
            onClick={() => navigate(`/job/${job._id}`)}
          >
            View Details
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Jobs;