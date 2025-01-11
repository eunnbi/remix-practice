import { data, redirect } from '@remix-run/node';
import * as v from 'valibot';

import { createJoke } from '~/models/joke.server';
import { getUserId } from '~/session.server';
import { getErrorMessage } from '~/utils/validation';

import type { ActionFunctionArgs } from '@remix-run/node';

const payloadSchema = v.object({
  name: v.pipe(
    v.string('Name must be a string'),
    v.minLength(1, 'Name is required'),
    v.minLength(3, 'Name must be at least 3 characters long')
  ),
  content: v.pipe(
    v.string('Content must be a string'),
    v.minLength(1, 'Content is required'),
    v.minLength(10, 'Content must be at least 10 characters long')
  ),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== 'POST') {
    throw new Response(null, { status: 405 });
  }

  const userId = await getUserId(request, { redirect: true });
  const formData = await request.formData();
  const parsed = v.safeParse(payloadSchema, Object.fromEntries(formData));

  if (!parsed.success) {
    return data(
      {
        errors: {
          name: getErrorMessage(parsed.issues, 'name'),
          content: getErrorMessage(parsed.issues, 'content'),
        },
      },
      { status: 400 }
    );
  }

  const { name, content } = parsed.output;
  const { id } = await createJoke({ name, content, jokesterId: userId });

  return redirect(`/jokes/${id}`);
};
