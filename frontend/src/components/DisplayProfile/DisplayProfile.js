import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import decode from 'jwt-decode'
import DisplayProfileInfo from './DisplayProfileInfo'

export default function DisplayProfile() {
    const [permissions, setPermissions] = useState()
    const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0()

    useEffect(() => {
        const getuserToken = async () => {
            try {
              const jwt = await getAccessTokenSilently();
              const decodedPermissions = decode(jwt)["permissions"]
              setPermissions(decodedPermissions)
            } catch (e) {
              console.log(e.message);
            }
          };
        
          if (isAuthenticated) getuserToken();
    },[isAuthenticated])
    
    if (isLoading){
        return <div>Loading ...</div>
    }

    return (
       isAuthenticated && (<DisplayProfileInfo user={user} permissions={permissions}/> )
    )
}
