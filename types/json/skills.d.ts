declare module '~/assets/data/skills.json' {
  type SkillJson = {
    languages: Skill[];
    frameworks: Skill[];
  };

  const value: SkillJson;
  export = value;
}
