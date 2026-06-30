import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function JobDetail() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [job, setJob] = useState(null);

    useEffect(() => {
        async function fetchJob() {
            try {
                const res = await axios.get(
                    `http://localhost:4000/job/${id}`
                );

                setJob(res.data.job);
            } catch (error) {
                console.log(error);
            }
        }

        fetchJob();
    }, [id]);

    if (!job) return <h2>Loading...</h2>;

    return (
        <div>
            <h1>{job.title}</h1>

            <p>
                <strong>Description:</strong> {job.description}
            </p>

            <p>
                <strong>Experience:</strong> {job.experience} Years
            </p>

            <p>
                <strong>Education:</strong> {job.education}
            </p>

            <p>
                <strong>Location:</strong> {job.location}
            </p>

            <p>
                <strong>Work Mode:</strong> {job.workMode}
            </p>

            <p>
                <strong>Job Type:</strong> {job.jobType}
            </p>

            <p>
                <strong>Vacancies:</strong> {job.vacancies}
            </p>

            <p>
                <strong>Status:</strong> {job.status}
            </p>

            <p>
                <strong>Salary:</strong> {job.salaryMin} - {job.salaryMax}
            </p>

            <p>
                <strong>Deadline:</strong>{" "}
                {new Date(job.applicationDeadline).toLocaleDateString()}
            </p>

            <h3>Requirements</h3>
            <ul>
                {job.requirements?.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <h3>Skills</h3>
            <ul>
                {job.skills?.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <button
                onClick={() => navigate(`/apply-job/${id}`)}
            >
                Apply
            </button>
        </div>
    );
}

export default JobDetail;