import React from 'react'
import {auth} from '@/lib/auth'
const page =async () => {

  const session = await  auth();

 
  if (!session) return <div>Not authenticated</div>;

  

  return (
    <div>
      hii
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}

export default page
