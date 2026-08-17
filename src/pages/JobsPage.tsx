import { Link, useNavigate } from "react-router-dom";
import JobCard from "../features/jobs/components/JobCard";
import { useJobs } from "@/features/jobs/hooks/useJobs";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import FullScreenLoader from "./FullScreenLoader";
import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, MapPin, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";

const JobsPage = () => {
  const { data: user } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === "recruiter") {
      navigate("/recruiter/jobs", { replace: true });
    }
  }, [user, navigate]);

  const { data: jobs, isLoading, isError } = useJobs();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [selectedLocation, setSelectedLocation] = useState<string>("ALL");

  const uniqueLocations = useMemo(() => {
    if (!jobs) return [];
    const locations = jobs.map((job) => job.location);
    return Array.from(new Set(locations));
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    if (!jobs) return [];
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        selectedType === "ALL" || job.employmentType === selectedType;

      const matchesLocation =
        selectedLocation === "ALL" || job.location === selectedLocation;

      return matchesSearch && matchesType && matchesLocation;
    });
  }, [jobs, searchQuery, selectedType, selectedLocation]);

  if (isLoading) return <FullScreenLoader />;

  if (isError) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-destructive">
          Something went wrong
        </h2>
        <p className="text-muted-foreground mt-1.5">
          Failed to load job listings. Please check your connection and try
          again.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header and Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50">
            Explore Opportunities
          </h1>
          <p className="text-sm text-muted-foreground font-medium mt-1.5">
            Discover your next career step with cutting-edge tech companies.
          </p>
        </div>
        <div className="bg-primary/5 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/10 shrink-0 self-start md:self-auto">
          {filteredJobs.length} {filteredJobs.length === 1 ? "Job" : "Jobs"}{" "}
          Available
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-slate-50/50 border border-slate-100 rounded-3xl p-5 dark:bg-slate-900/40 dark:border-slate-800/80 flex flex-col md:flex-row gap-4 items-center">
        {/* Search Input */}
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by role, company, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white pl-11 py-5 rounded-2xl border-slate-100 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary dark:bg-slate-950 dark:border-slate-800"
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Filter Type */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-100 px-3.5 py-2.5 rounded-2xl shadow-sm dark:bg-slate-950 dark:border-slate-800 flex-1 md:flex-initial">
            <Briefcase className="h-4 w-4 text-slate-400" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="text-xs font-bold text-slate-700 bg-transparent border-none outline-none dark:text-slate-300 w-full"
            >
              <option value="ALL">All Job Types</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="FREELANCE">Freelance</option>
            </select>
          </div>

          {/* Filter Location */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-100 px-3.5 py-2.5 rounded-2xl shadow-sm dark:bg-slate-950 dark:border-slate-800 flex-1 md:flex-initial">
            <MapPin className="h-4 w-4 text-slate-400" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="text-xs font-bold text-slate-700 bg-transparent border-none outline-none dark:text-slate-300 w-full"
            >
              <option value="ALL">All Locations</option>
              {uniqueLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid List */}
      {filteredJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-slate-100 rounded-3xl dark:border-slate-800/80">
          <SlidersHorizontal className="h-10 w-10 text-muted-foreground/60 mb-3" />
          <h3 className="text-lg font-bold">No jobs match your search</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            Try adjusting your search query or filters to find other openings.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredJobs.map((job) => (
            <Link key={job.id} to={`/jobs/${job.id}`} className="block">
              <JobCard job={job} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsPage;
