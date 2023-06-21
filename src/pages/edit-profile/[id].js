import UserForm from "@/components/UserForm";
import useSWR from "swr"
import { useRouter } from "next/router";

export default function EditProfilePage() {
  const router= useRouter();
  const {id}= router.query;

    const { data: user, error, isLoading } = useSWR(id ? `/api/users/${id}`: null)
    if(!user) return <h1>Loading...</h1>
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    console.log(user);

    return (
    <UserForm buttonText="Save and Update Profile" prevName={user.name} prevLocation={user.location} prevEmail={user.email} prevBio={user.bio} />
  )
}
