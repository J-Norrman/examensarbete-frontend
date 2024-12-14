import Image from "next/image";
import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
    <h2>Welcome to the Skill Gems Viewer</h2>
    <p>
      View the <Link href="/gems">full list of skill gems</Link>.
    </p>
  </div>
  );
}
