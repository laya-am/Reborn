import { useRouter } from 'next/router';
import React from 'react'
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import UserProducts from '../UserProducts';
// import { useSession } from "next-auth/react"

export default function ProfilePage() {
const router= useRouter();
  const {id}= router.query;

  // const { data: session } = useSession()

  const { data: user } = useSWR(id ? `/api/users/${id}`: null)
  if (!user) {
    return <h1>Loading...</h1>;
  }
 console.log(user);
  // if (session) {
   
  return(
    <div>
    <Image src={user.image} alt={`${user.name}'s profile picture`} width="300" height="300" />
    <h2>{user.name}</h2>
    <h3>{user.email}</h3>
    <h5>Location: {user.location}</h5>
    <p>Bio: {user.bio}</p>
    {user.products.length > 0 && <UserProducts products={user.products} />}
    <Link href={`/edit-profile/${id}`}><button>Edit Profile</button></Link>
    </div>
  )
 {/* } return <h3>please log in first</h3> */}
}
