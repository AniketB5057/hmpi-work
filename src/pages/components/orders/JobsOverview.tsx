const jobsOverview = [
  {
    title: "Ending within 30 days",
    count: 0,
    subtitle: "Recurring jobs ending within the next 30 days.",
    badgeColor: "gulf-stream",
  },
  {
    title: "Late",
    count: 0,
    subtitle:
      "Jobs with incomplete past visits. Mark them complete or reschedule the work.",
    badgeColor: "cascade",
  },
  {
    title: "Requires invoicing",
    count: 0,
    subtitle: "Jobs with incomplete invoice reminders.",
    badgeColor: "cadet-blue",
  },
  {
    title: "Action required",
    count: 0,
    subtitle:
      "Jobs with no scheduled invoice reminders or visits. Schedule work or close the jobs.",
    badgeColor: "powder-ash",
  },
  {
    title: "Unscheduled",
    count: 0,
    subtitle:
      "Jobs with unscheduled visits. Use the Calendar to schedule them.",
    badgeColor: "tradewind",
  },
  {
    title: "Today",
    count: 0,
    subtitle: "Jobs with visits scheduled today.",
    badgeColor: "bouquet",
  },
  {
    title: "Upcoming",
    count: 0,
    subtitle: "Jobs with future visits scheduled.",
    badgeColor: "bouquet",
  },
];

function JobsOverview() {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg jobs-overview-card">
      <div className="flex job-overview-head-bg">
        <div className="job-overview-head">Jobs Overview</div>
      </div>
      <div className="ml-[9px] my-[24px]">
        {jobsOverview.map((jobOverview, index) => (
          <div key={index} className="flex items-center mb-[14px]">
            <div
              className={`w-1/6 job-overview-item-count mr-[9px] ${jobOverview.badgeColor}`}
            >
              {jobOverview.count}
            </div>
            <div className="w-5/6">
              <div className="flex flex-col">
                <span className="job-overview-item-title">
                  {jobOverview.title}
                </span>
                <span className="job-overview-item-sub-title mt-[5px]">
                  {jobOverview.subtitle}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobsOverview;
