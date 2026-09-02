'use client';

import dynamic from 'next/dynamic';

const Background3D = dynamic(() => import('./Background3D'), {
  ssr: false,
});

export default function DynamicBackground3D() {
  return <Background3D />;
}
