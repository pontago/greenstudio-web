import clsx from 'clsx';
import { SkillCategory, SkillCategoryType, SkillRecord } from '~/models/skill';

type Props = {
  category: SkillCategoryType;
  records: SkillRecord[];
};

export const Skill = ({ category, records }: Props) => {
  return (
    <>
      <h2 className='text-center text-sm mt-4 font-medium text-gray-600 dark:text-neutral-400'>
        {clsx(
          category === SkillCategory.LANGUAGES && 'プログラミング言語・DB',
          category === SkillCategory.FRAMEWORKS && 'フレームワーク・ライブラリ・インフラ'
        )}
      </h2>
      <div>
        <div className='space-y-5' />
        {records.map((skill) => (
          <div className='mt-2' key={skill.id}>
            <div className='mb-2 flex justify-between items-center'>
              <h4 className='text-sm font-semibold text-gray-600 dark:text-neutral-400'>{skill.name}</h4>
              <span className='text-sm text-gray-600 dark:text-neutral-400'>{skill.experience}</span>
            </div>
            <div
              className='flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700'
              role='progressbar'
              aria-valuenow={skill.level}
              aria-valuemin={0}
              aria-valuemax={3}
            >
              <div
                className={clsx(
                  'flex flex-col justify-center rounded-full overflow-hidden  text-xs text-white text-center whitespace-nowrap transition duration-500 ',
                  skill.level === 1 && 'bg-blue-600',
                  skill.level === 2 && 'bg-teal-500',
                  skill.level === 3 && 'bg-yellow-500'
                )}
                style={{ width: `${Math.trunc(skill.level * 33.4)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
