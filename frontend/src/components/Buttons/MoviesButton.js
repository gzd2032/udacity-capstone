import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'


export default function MoviesButton({getList}) {
    const { isAuthenticated } = useAuth0()

    return isAuthenticated && (
        <div>
          <button onClick={() => getList('movies')}>Movies</button>
        </div>
    )
}
