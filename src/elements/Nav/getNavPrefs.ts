import type { NavPreferences, Payload } from 'payload'
import type { User } from '@/payload-types'

import { cache } from 'react'

type UserWithCollection = User & { collection: 'users' }

export const getNavPrefs = cache(
  async ({
    payload,
    user,
  }: {
    payload: Payload
    user?: UserWithCollection
  }): Promise<NavPreferences | null> =>
    user
      ? await payload
          .find({
            collection: 'payload-preferences',
            depth: 0,
            limit: 1,
            user: user as Parameters<typeof payload.find>[0]['user'],
            where: {
              and: [
                {
                  key: {
                    equals: 'nav',
                  },
                },
                {
                  'user.relationTo': {
                    equals: user.collection,
                  },
                },
                {
                  'user.value': {
                    equals: user.id,
                  },
                },
              ],
            },
          })
          ?.then((res) => res?.docs?.[0]?.value as NavPreferences)
      : null,
)
