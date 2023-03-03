import '@/styles/globals.scss'
import { useState } from 'react'
import type { AppProps } from 'next/app'
import { createClient, JitsuProvider } from "@jitsu/react";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
const queryClient = new QueryClient();
// initialize Jitsu client
const jitsuClient = createClient({
  tracking_host: "https://t.jitsu.com",
  key: "js.3e06bkykat02zq1urqd8mn.9lec8lyc16rphckgp4v1i",
  // See Jitsu SDK parameters section for more options
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return  (
  <JitsuProvider client={jitsuClient}>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </JitsuProvider>
  )
}
