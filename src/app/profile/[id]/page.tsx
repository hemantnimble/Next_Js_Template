import React from 'react'

function UserProfile({ params }: any) {
    return (
        <div>UserProfile
            <h1>User ID: {params.id} </h1>
        </div>
    )
}

export default UserProfile