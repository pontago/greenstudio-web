import { matchSorter } from 'match-sorter';
import skillJson from '~/assets/data/skills.json' assert { type: 'json' };

export const SkillCategory = {
  FRONTEND: 'frontend',
  BACKEND: 'backend',
} as const;

export type SkillCategoryType = (typeof SkillCategory)[keyof typeof SkillCategory];

type Skill = {
  name: string;
  level: number;
  experience: string;
};

export type SkillRecord = Skill & {
  id: string;
  category: SkillCategoryType;
};

const skillData = {
  records: {} as Record<string, SkillRecord>,

  async getAll(): Promise<SkillRecord[]> {
    return Object.keys(skillData.records).map((key) => skillData.records[key]);
  },

  async create(index: number, values: Skill, category: SkillCategoryType): Promise<SkillRecord> {
    const id = `${category}-${index}`;
    const newSkill = { id, category, ...values };
    skillData.records[id] = newSkill;
    return newSkill;
  },
};

export async function getSkills(query?: string | null) {
  let skills = await skillData.getAll();
  if (query) {
    skills = matchSorter(skills, query);
  }
  return skills;
}

skillJson.frontend.forEach((values, id) => {
  skillData.create(id, values, SkillCategory.FRONTEND);
});

skillJson.backend.forEach((values, id) => {
  skillData.create(id, values, SkillCategory.BACKEND);
});
