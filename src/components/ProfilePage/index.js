import React from 'react'
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import UserProducts from '../UserProducts';
import { useSession, signOut } from "next-auth/react"
import {useRouter} from 'next/router';

export default function ProfilePage() {
  const router= useRouter();
  const { data: session } = useSession()
  const id= session?.user.id;

  function handleSignOut(){
    signOut();
    if(!user){
      router.push("/");
    }
  }

  const { data: user } = useSWR(id ? `/api/users/${id}`: null)
  if (!user) {
    return <h1>Loading...</h1>;
  }
 console.log(user);
  if (session) {
    return(
      <div>
      <Image src={user.image} alt={`${user.name}'s profile picture`} width="300" height="300" />
      <button onClick={handleSignOut}>Sign out</button>
      <h2>{user.name}</h2>
      <h3>{user.email}</h3>
      <h5>Location: {user.location}</h5>
      <p>Bio: {user.bio}</p>
      {user.products.length > 0 && <UserProducts products={user.products} />}
      <Link href={`/edit-profile/${id}`}><button>Edit Profile</button></Link>
      </div>
    )
  } 
  // return <h3>please log in first</h3>
}
