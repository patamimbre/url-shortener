import z from 'zod';

export type ShortenActionState = { original?: string, link?: string, error?: string };

export const UrlInputSchema = z.string({
  required_error: "Please enter a URL",}).url({
  message: "Please enter a valid URL",
});

export const RedisKeys = {
  original: (shortenedUrl: string) => `original:${shortenedUrl}`,
  shortened: (originalUrl: string) => `shortened:${originalUrl}`,
}