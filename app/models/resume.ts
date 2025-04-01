import { matchSorter } from 'match-sorter';
import resumesJson from '~/assets/data/resumes.json' assert { type: 'json' };

export const ResumeCategory = {
  SOLO: 'solo',
  CONTRACT: 'contract',
} as const;

type ResumeCategory = (typeof ResumeCategory)[keyof typeof ResumeCategory];

type ResumeLink = {
  name: string;
  url: string;
};

type Resume = {
  date: string;
  category: string;
  title: string;
  description: string;
  techDescription: string;
  portfolioLink?: string;
  links?: ResumeLink[];
  print?: boolean;
};

export type ResumeRecord = Resume & {
  id: number;
};

const resumeData = {
  records: {} as Record<number, ResumeRecord>,

  async getAll(): Promise<ResumeRecord[]> {
    return Object.keys(resumeData.records).map((key) => resumeData.records[Number(key)]);
  },

  async create(index: number, values: Resume): Promise<ResumeRecord> {
    const id = index;
    const newResume = { id, ...values };
    resumeData.records[id] = newResume;
    return newResume;
  },
};

export async function getResumes(query?: string | null, print?: boolean | null) {
  let portfolios = await resumeData.getAll();
  if (query) {
    portfolios = matchSorter(portfolios, query);
  }
  if (print) {
    portfolios = portfolios.filter((portfolio) => portfolio.print == null || portfolio.print);
  }
  return portfolios;
}

resumesJson.resume.forEach((values, index) => {
  resumeData.create(index, values);
});
