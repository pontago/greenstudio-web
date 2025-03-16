declare module '~/assets/data/resumes.json' {
  type ResumeJson = {
    resume: Resume[];
  };

  const value: ResumeJson;
  export = value;
}
