import React from 'react'
import { User } from '@/state/api'
import Image from 'next/image'
type Props = {
    user:User
}
const UserCard = ({user}: Props) => {
    return (
        <div className="flex items-center rounded border p-4 shadow">
            {user.profilePictureUrl && (
                <Image src={`/p1.jpeg`} alt="profile picture" width={32} height={32} className="rounded-full" />
            )}
            <div className="ml-4">
                <h3>{user.username}</h3>
                <p>{user.email}</p>
            </div>
        </div>
    )
}
export default UserCard;