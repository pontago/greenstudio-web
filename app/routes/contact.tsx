import { getFormProps, getInputProps, getTextareaProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { ActionFunctionArgs, MetaFunction } from 'react-router';
import { Form, useActionData } from 'react-router';
import { useEffect } from 'react';
import { z } from 'zod';
import DefaultLayout from '~/components/layout/DefaultLayout';

declare global {
  interface Window {
    grecaptcha: {
      execute: (site_key: string, options: { action: string }) => Promise<string>;
    };
  }
}

type ContactResponse = {
  status: 'success' | 'ng';
  message?: string;
  errors?: Record<string, string[]>;
};

const schema = z.object({
  name: z
    .string({ required_error: 'お名前が入力されていません。' })
    .max(100, 'お名前は100文字以内で入力してください。'),
  email: z
    .string({ required_error: 'メールアドレスが入力されていません。' })
    .email('メールアドレスの形式が正しくありません。'),
  message: z
    .string({ required_error: '本文が入力されていません。' })
    .max(10000, '本文は10000文字以内で入力してください。'),
});

export async function clientAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const submission = parseWithZod(formData, { schema });
  if (submission.status !== 'success') {
    return submission.reply();
  }

  const token = await window.grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, { action: 'contact' });
  formData.append('g-recaptcha-response', token);

  const json = Object.fromEntries(formData);
  const response = await fetch(import.meta.env.VITE_CONTACT_URL, {
    method: 'POST',
    body: JSON.stringify(json),
  });

  const responseJson: ContactResponse = await response.json();
  if (!response.ok) {
    return submission.reply({ formErrors: [...(responseJson.message ?? [])], fieldErrors: responseJson.errors });
  }

  return submission.reply();
}

export const meta: MetaFunction = () => {
  return [
    { title: 'お問い合わせ - GREEN STUDIO' },
    { name: 'description', content: 'GREEN STUDIOへのお問い合わせフォームです。' },
  ];
};

export default function Contact() {
  const lastResult = useActionData<typeof clientAction>();
  const [form, { name, email, message }] = useForm({
    lastResult,
    //shouldValidate: 'onBlur',
    //shouldRevalidate: 'onInput',
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });

  useEffect(() => {
    if (typeof window.grecaptcha !== 'undefined') {
      return;
    }

    const script = document.createElement('script');
    script.id;
    script.src = `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      //document.body.removeChild(script);
    };
  }, []);

  return (
    <DefaultLayout>
      <main id='content'>
        <div id='contact' className='w-full max-w-3xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8'>
          <div className='w-full mx-auto'>
            <div className='text-center'>
              <h1 className='text-xl font-bold text-gray-800 sm:text-2xl dark:text-white'>お問い合わせ</h1>
            </div>
            <div className='mt-4 p-4 relative z-10 bg-white sm:mt-4 md:p-10 dark:bg-neutral-900 dark:border-neutral-700'>
              {lastResult?.status === 'success' && (
                <div className='w-full text-center'>
                  <p className='text-lg text-gray-600 dark:text-neutral-400'>お問い合わせを受け付けました</p>
                  <p className='mt-4 text-sm text-gray-600 dark:text-neutral-400'>
                    確認のため自動返信メールをお送りしております。
                  </p>
                  <p className='text-sm text-gray-600 dark:text-neutral-400'>
                    内容を確認の上、ご連絡いたしますのでしばらくお待ちください。
                  </p>
                </div>
              )}
              {/* Form */}
              {lastResult?.status !== 'success' && (
                <Form method='post' {...getFormProps(form)}>
                  <div className='text-sm text-red-600 my-4'>{form.errors}</div>
                  <div className='mb-4 sm:mb-8'>
                    <label htmlFor='contact-name' className='block mb-2 text-sm font-medium dark:text-white'>
                      お名前
                    </label>
                    <input
                      {...getInputProps(name, { type: 'text' })}
                      id='contact-name'
                      placeholder='お名前'
                      className='py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
                    />
                    <div className='text-sm text-red-600 mt-2'>{name.errors}</div>
                  </div>
                  <div className='mb-4 sm:mb-8'>
                    <label htmlFor='contact-email' className='block mb-2 text-sm font-medium dark:text-white'>
                      メールアドレス
                    </label>
                    <input
                      {...getInputProps(email, { type: 'email' })}
                      id='contact-email'
                      placeholder='メールアドレス'
                      className='py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
                    />
                    <div className='text-sm text-red-600 mt-2'>{email.errors}</div>
                  </div>
                  <div>
                    <label htmlFor='contact-message' className='block mb-2 text-sm font-medium dark:text-white'>
                      お問い合わせ内容
                    </label>
                    <div className='mt-1'>
                      <textarea
                        {...getTextareaProps(message)}
                        id='contact-message'
                        placeholder='本文を入力してください'
                        rows={10}
                        className='py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
                      />
                      <div className='text-sm text-red-600 mt-2'>{message.errors}</div>
                    </div>
                  </div>
                  <div className='mt-6 grid'>
                    <button
                      type='submit'
                      className='w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none'
                    >
                      送信
                    </button>
                  </div>
                </Form>
              )}
              {/* End Form */}
            </div>
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
}
