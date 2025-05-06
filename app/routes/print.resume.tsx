import { useLoaderData, useSearchParams } from 'react-router';
import { FaHome, FaRegBuilding } from 'react-icons/fa';
import { Skill } from '~/components/features/Skill';
import { getResumes, ResumeCategory } from '~/models/resume';
import { getSkills, SkillCategory } from '~/models/skill';

export const clientLoader = async () => {
  try {
    const skills = await getSkills();
    const resumes = await getResumes(null, true);

    return { skills, resumes };
  } catch (error) {
    throw new Response('Internal Server Error', { status: 500 });
  }
};

export default function PrintResume() {
  const { skills, resumes } = useLoaderData<typeof clientLoader>();
  const [searchParams] = useSearchParams();

  return (
    <main id='content' className='my-4'>
      <div id='home' className='w-full max-w-5xl mx-auto  px-4 sm:px-6 lg:px-8'>
        {/* Profile */}
        <div id='profile'>
          <h2 className='text-lg font-semibold w-full text-center  text-gray-800 dark:text-neutral-200'>職務経歴書</h2>
          <div className='mt-4'>
            <p>氏名： {searchParams.get('name')}</p>
            <p>生年月： {searchParams.get('birth')}</p>
            <p>居住地： {searchParams.get('address')}</p>
          </div>
        </div>
        {/* End Profile */}

        <div className='mt-3 pt-4 border-t border-gray-200 dark:border-neutral-700'>
          <h2 className='text-normal font-semibold text-gray-800 dark:text-neutral-200'>職務要約</h2>
          <p className='mt-3 text-sm'>
            自社サービス開発企業で2年間従事し、その後フリーランスとして独立して約20年になります。独立後の10年間は、主にWebシステムの受託開発を行っていました。受託開発と並行して個人でスマホアプリを開発していましたが、直近10年間は個人アプリの開発に専念していました。
          </p>
        </div>

        <div className='mt-3 pt-4 border-t border-gray-200 dark:border-neutral-700'>
          <h2 className='text-normal font-semibold text-gray-800 dark:text-neutral-200'>自己PR</h2>
          <div className='mt-3 text-sm'>
            <p>
              個人でのアプリ開発を多く行ってきた経験から、ユーザーのフィードバックを大切にした開発をしてきました。
              機能面だけではなくユーザービリティを意識したアプリ開発、フロントエンドからバックエンドまで一通りの開発経験があります。
            </p>
            <p>受託開発では、お客さまのニーズにあった開発・運用方法を提案することを心がけてきました。</p>
            <p>個人でリリースしたアプリでは、ダウンロード数74万、ランキング5位の経験があります。</p>
            <p>
              mixiのソーシャルアプリでリリースしたものは、30万ユーザー、ランキング1位、300万/日のアクセス数に対応した経験があります。
            </p>
          </div>
        </div>

        {/* Skills */}
        <div id='skill' className='my-4 pt-3 sm:my-4  border-t border-gray-200 dark:border-neutral-700'>
          <h2 className='font-semibold text-gray-800 dark:text-neutral-200'>スキル</h2>
          <div className='mt-4 w-1/2'>
            <div className='flex justify-normal'>
              <div className='inline-block mb-2 ms-[calc(33%-20px)] py-0.5 px-1.5 bg-blue-50 border border-blue-200 text-xs font-medium text-blue-600 rounded-lg dark:bg-blue-800/30 dark:border-blue-800 dark:text-blue-500'>
                Level1
              </div>
              <div className='inline-block mb-2 ms-[calc(33%-50px)] py-0.5 px-1.5 bg-teal-50 border border-teal-200 text-xs font-medium text-teal-500 rounded-lg dark:bg-teal-800/30 dark:border-teal-800 dark:text-teal-500'>
                Level2
              </div>
              <div className='inline-block mb-2 ms-[calc(33%-50px)] py-0.5 px-1.5 bg-yellow-50 border border-yellow-200 text-xs font-medium text-yellow-500 rounded-lg dark:bg-yellow-800/30 dark:border-yellow-800 dark:text-yellow-500'>
                Level3
              </div>
            </div>
            <div className='flex h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700'>
              <div
                className='flex flex-col justify-center overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap'
                style={{ width: '33%' }}
                role='progressbar'
                aria-valuenow={10}
                aria-valuemin={0}
                aria-valuemax={30}
              />
              <div
                className='flex flex-col justify-center overflow-hidden bg-teal-500 text-xs text-white text-center whitespace-nowrap'
                style={{ width: '33%' }}
                role='progressbar'
                aria-valuenow={10}
                aria-valuemin={0}
                aria-valuemax={30}
              />
              <div
                className='flex flex-col justify-center overflow-hidden bg-yellow-500 text-xs text-white text-center whitespace-nowrap'
                style={{ width: '34%' }}
                role='progressbar'
                aria-valuenow={10}
                aria-valuemin={0}
                aria-valuemax={30}
              />
            </div>
          </div>
          <div className='mt-2'>
            <div className='inline-block mb-1 py-0.5 px-1.5 bg-blue-50 border border-blue-200 text-xs font-medium text-blue-600 rounded-lg dark:bg-blue-800/30 dark:border-blue-800 dark:text-blue-500'>
              Level1
            </div>
            <p className='text-xs text-gray-600 dark:text-neutral-400'>
              簡単なプログラムを作成・修正できる。もしくは最近使用していない。
            </p>
            <div className='inline-block mb-1 py-0.5 px-1.5 bg-teal-50 border border-teal-200 text-xs font-medium text-teal-500 rounded-lg dark:bg-teal-800/30 dark:border-teal-800 dark:text-teal-500'>
              Level2
            </div>
            <p className='text-xs text-gray-600 dark:text-neutral-400'>
              個人アプリ開発、受託開発で使用したことがある。直近使用率低め、経験が不十分だと感じるレベル。
            </p>
            <div className='inline-block mb-1 py-0.5 px-1.5 bg-yellow-50 border border-yellow-200 text-xs font-medium text-yellow-500 rounded-lg dark:bg-yellow-800/30 dark:border-yellow-800 dark:text-yellow-500'>
              Level3
            </div>
            <p className='text-xs text-gray-600 dark:text-neutral-400'>
              個人アプリ開発、受託開発で使用したことがある。直近5年以内で使用している。
            </p>
          </div>

          <div className='grid grid-cols-1 mt-2 sm:grid-cols-2 gap-x-3 border-gray-200  divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700'>
            <div className='sm:-ms-4 sm:px-4'>
              <Skill
                category={SkillCategory.LANGUAGES}
                records={skills.filter((skill) => skill.category === SkillCategory.LANGUAGES)}
              />
            </div>

            <div className='sm:px-4'>
              <Skill
                category={SkillCategory.FRAMEWORKS}
                records={skills.filter((skill) => skill.category === SkillCategory.FRAMEWORKS)}
              />
            </div>
          </div>
        </div>

        <div>
          <div className='mb-2 text-gray-600 dark:text-neutral-400'>その他</div>
          <div className='text-sm text-gray-600 dark:text-neutral-400'>
            GitHub Actions, Docker, Tailwind, Vuetify, Preline UI, ActionScript, CodeIgniter, memcached, TokyoTyrant,
            Redis, qmail, Postfix, CourierIMAP, Dovecot, SpamAssassin, bsfilter, ClamAV, bind, Samba, NFS, Apache,
            lighttpd, Nginx, SQLite
          </div>
        </div>

        <div className='mt-3 pt-3 border-t border-gray-200 dark:border-neutral-700'>
          <h2 className='text-normal font-semibold text-gray-800 dark:text-neutral-200'>開発経歴</h2>
          <div className='mt-3'>
            {/* Timeline */}
            {resumes?.map((resume, index) => (
              <div key={index}>
                {/* Heading */}
                <div className='ps-2 my-2 first:mt-0'>
                  <div className='text-xs font-medium uppercase text-gray-500 dark:text-neutral-400'>{resume.date}</div>
                </div>
                {/* End Heading */}
                {/* Item */}
                <div className='flex gap-x-3 relative group rounded-lg hover:bg-gray-100 dark:hover:bg-white/10'>
                  {/* <a className='z-1 absolute inset-0' href='#/' /> */}
                  {/* Icon */}
                  <div className='relative last:after:hidden after:absolute after:top-0 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700 dark:group-hover:after:bg-neutral-600'>
                    <div className='relative z-10 size-7 flex justify-center items-center'>
                      <div className='size-2 rounded-full bg-white border-2 border-gray-300 group-hover:border-gray-600 dark:bg-neutral-800 dark:border-neutral-600 dark:group-hover:border-neutral-600' />
                    </div>
                  </div>
                  {/* End Icon */}
                  {/* Right Content */}
                  <div className='grow p-2 pb-8'>
                    <div className='flex gap-x-1.5 font-semibold text-gray-800 dark:text-white'>
                      {resume.category === ResumeCategory.SOLO && <FaHome className='shrink-0 size-4 mt-1' />}
                      {resume.category === ResumeCategory.CONTRACT && (
                        <FaRegBuilding className='shrink-0 size-4 mt-1' />
                      )}

                      <h2>{resume.title}</h2>

                      {resume.category === ResumeCategory.SOLO && (
                        <h3 className='inline-block mb-1 py-0.5 px-1.5 bg-teal-50 border border-teal-200 text-xs font-medium text-teal-500 rounded-lg dark:bg-teal-800/30 dark:border-teal-800 dark:text-teal-500'>
                          個人開発
                        </h3>
                      )}
                      {resume.category === ResumeCategory.CONTRACT && (
                        <h3 className='inline-block mb-2 py-0.5 px-1.5 bg-yellow-50 border border-yellow-200 text-xs font-medium text-yellow-500 rounded-lg dark:bg-yellow-800/30 dark:border-yellow-800 dark:text-yellow-500'>
                          受託開発
                        </h3>
                      )}
                    </div>
                    <p
                      className='mt-1 text-sm text-gray-600 dark:text-neutral-400'
                      dangerouslySetInnerHTML={{ __html: resume.description }}
                    />
                    <p
                      className='mt-1 text-sm text-teal-700 dark:text-teal-700'
                      dangerouslySetInnerHTML={{ __html: resume.techDescription }}
                    />
                  </div>
                  {/* End Right Content */}
                </div>
                {/* End Item */}
              </div>
            ))}
          </div>
        </div>

        <div className='mt-3 pt-3 border-t border-gray-200 dark:border-neutral-700'>
          <h2 className='text-normal font-semibold text-gray-800 dark:text-neutral-200'>SNS</h2>
          <div className='flex justify-start'>
            <ul className='mt-2 flex flex-col gap-y-3'>
              <li className='flex items-center gap-x-2.5'>
                HP：
                <a href='https://greenstudio.jp/' className='text-blue-500'>
                  https://greenstudio.jp/
                </a>
              </li>
              <li className='flex items-center gap-x-2.5'>
                ブログ：
                <a href='https://greenstudio.jp/blog/' className='text-blue-500'>
                  https://greenstudio.jp/blog/
                </a>
              </li>
              <li className='flex items-center gap-x-2.5'>
                GitHub：
                <a href='https://github.com/pontago' className='text-blue-500'>
                  https://github.com/pontago
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
