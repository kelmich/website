'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FlatFalconRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/blog/flatfalcon/1-introduction');
  }, [router]);

  return <p>Redirecting…</p>;
}
