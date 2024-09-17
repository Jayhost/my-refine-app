'use client';
import { useOne } from "@refinedev/core";
import { Profile, Loader } from "@components";
import { useParams } from 'next/navigation';


const AgentProfile = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: id as string,
  });

  const myProfile = data?.data ?? [];

  if (isLoading) return <Loader path="Agent Profile" />;
  if (isError) return <Loader path="Agent Profile" isError={true} />;

  return (
    <Profile
      type="Agent"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    />
  );
};

export default AgentProfile;
