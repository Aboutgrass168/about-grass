import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

// Using type assertion to make the hook compatible with both collection and global configs
export const revalidateRedirects: CollectionAfterChangeHook & GlobalAfterChangeHook = (
  args: any,
) => {
  const payload = args.req.payload

  payload.logger.info(`Revalidating redirects`)

  revalidateTag('redirects')

  return args.doc
}
