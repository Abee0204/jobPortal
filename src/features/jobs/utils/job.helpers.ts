export const getEmploymentTypeLabel = (type: string) => {
  switch (type) {
    case "FULL_TIME":
      return "Full Time";
    case "PART_TIME":
      return "Part Time";
    case "CONTRACT":
      return "Contract";
    case "INTERNSHIP":
      return "Internship";
    case "FREELANCE":
      return "Freelance";
    default:
      return type;
  }
};

export const getExperienceLevelLabel = (level: string) => {
  switch (level) {
    case "FRESHER":
      return "Fresher";
    case "MID":
      return "Mid Level";
    case "SENIOR":
      return "Senior Level";
    case "LEAD":
      return "Lead Level";
    default:
      return level;
  }
};

export const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const timeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) return "Today";
  if (diffDays === 2) return "Yesterday";
  return `${diffDays} days ago`;
};
