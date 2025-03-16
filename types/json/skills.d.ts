declare module '~/assets/data/skills.json' {
  type SkillJson = {
    frontend: Skill[];
    backend: Skill[];
  };

  const value: SkillJson;
  export = value;
}
