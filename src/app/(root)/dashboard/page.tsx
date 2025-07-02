import React from 'react'
import {auth} from '@/lib/auth'
const page =async () => {

  const session = await  auth();

  

  return (
    <div>
      hii
      {session?.user?.userName}
    </div>
  )
}

export default page
