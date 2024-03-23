'use server';

import { humanId } from 'human-id'
import { kv } from "@vercel/kv";
import { revalidatePath } from 'next/cache';
import { RedisKeys, ShortenActionState, UrlInputSchema } from './types';

export async function shortenUrl(prevState: ShortenActionState, form: FormData) {
  try {
    const validatedUrl = UrlInputSchema.safeParse(form.get("link"));

    if (!validatedUrl.success) {
      return { error: validatedUrl.error.errors[0].message, link: undefined };
    }

    const { data: originalUrl } = validatedUrl;
    const existingShortenedUrl = await kv.get<string>(RedisKeys.shortened(originalUrl));

    if (existingShortenedUrl) {
      return { link: existingShortenedUrl, error: undefined, original: originalUrl };
    }

    const id = humanId({ separator: "-", capitalize: false });
    const currentUrl = process.env.VERCEL_URL;
    const shortenedUrl = `${currentUrl}/${id}`;

    // In a single call, set bot the shortened URL and the original URL
    await kv.mset({
      [RedisKeys.original(shortenedUrl)]: originalUrl,
      [RedisKeys.shortened(originalUrl)]: shortenedUrl,
    });

    return { link:shortenedUrl, error: undefined, original: originalUrl };
  } catch (error) {
    return { error: "An error occurred while shortening the URL", link: undefined, original: undefined};
  } finally {
    revalidatePath("/");
  }
}