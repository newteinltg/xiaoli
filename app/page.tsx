"use client";

import dynamic from 'next/dynamic';

const SharinganSketch = dynamic(() => import("../components/SharinganSketch"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <SharinganSketch />
    </main>
  );
}
