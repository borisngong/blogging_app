import React from "react";

export default function UserPage({ params }: any) {
  return (
    <div>
      <h1>User profile</h1>
      <p>Stub page for user with id: {params.id}</p>
    </div>
  );
}
