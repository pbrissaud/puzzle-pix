'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from 'react'

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
  const { isAuthenticated, user } = useKindeBrowserClient();

  useEffect(() => {
    if (user) {
      posthog.identify(user.id, {
        email: user.email,
      });
    } else if (!isAuthenticated) {
      posthog.reset();
    }
  }, [isAuthenticated, user]);

  return children;
}