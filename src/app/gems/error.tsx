'use client';

export default function Error({ error }: { error: Error }) {
  return (
    <div>
      <h2>Error</h2>
      <p>{error.message}</p>
    </div>
  );
}