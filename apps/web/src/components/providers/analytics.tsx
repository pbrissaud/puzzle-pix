'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import { api } from '../../trpc/react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: '/ingest',
    ui_host: 'https://eu.posthog.com',
  })
}
export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>
    <PostHogAuthWrapper>
      {children}
    </PostHogAuthWrapper>
  </PostHogProvider>
}

function PostHogAuthWrapper({ children }: { children: React.ReactNode }) {
  
  const { data: user } = api.me.useQuery(undefined, {
    staleTime: 1000 * 30,
    select: (data) => data.user
  })

  useEffect(() => {
    if (user) {
      posthog.identify(user.id, {
        email: user.email,
      });
    } else if (!user) {
      posthog.reset();
    }
  }, [user]);

  return children;
}