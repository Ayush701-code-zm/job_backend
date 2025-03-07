export const createJobController = async (req, res, next) => {
  const { company, position, status, workType, location } = req.body;
  if (!company || !position || !status || !workType || !location) {
    next("provide fields");
  }
  req.body.createdBy = req.user.userId;
  const job = await jobModel.create(req.body);
  res.status(201).json({ job });
};

export const getJobsController = async (req, res, next) => {
  const jobs = await jobModel.find().populate("createdBy", "name");
  res.json(jobs);
};

export const updateJobsController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position, status, workType, location } = req.body;
  if (!company || !position || !status || !workType || !location) {
    next("provide fields");
  }
  const job = await jobModel
    .findByIdAndUpdate(id, req.body, { new: true })
    .populate("createdBy", "name");

  if (!job) {
    return res.status(404).send("Job not found");
  }
  res.json(job);
  const updatedJob = await jobModel
    .findByIdAndUpdate(id, { status: "archived" }, { new: true })
    .populate("createdBy", "name");

  res.json(updatedJob);
};

export const deleteJobsController = async (req, res, next) => {
  const { id } = req.params;
  const job = await jobModel.findByIdAndDelete(id);
  if (!job) {
    return res.status(404).send("Job not found");
  }

  res.json({ message: "Job deleted successfully" });
};
