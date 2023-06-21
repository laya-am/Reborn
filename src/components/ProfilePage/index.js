import { useRouter } from 'next/router';
import React from 'react'
import useSWR from 'swr';
import Image from 'next/image';

export default function ProfilePage() {
const router= useRouter();
  const {id}= router.query;

  const { data: user } = useSWR(id ? `/api/users/${id}`: null)
 
  if (!user) {
    return <h1>No User Found</h1>;
  }

  return (
    <div>
    <Image src={user.profilePicture} alt={`${user.name}'s profile picture`} width="300" height="300" />
    <h2>{user.name}</h2>
    <h3>{user.email}</h3>
    <h5>Location: {user.location}</h5>
    <p>Bio: {user.bio}</p>
    </div>
  )
}
