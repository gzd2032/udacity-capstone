import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'


export default function ActorsButton({getList}) {
  const { isAuthenticated } = useAuth0()

  return isAuthenticated && (
      <div>
        <button onClick={() => getList('actors')}>Actors</button>
      </div>
  )
}
