import { useEffect, useState } from 'react'
import ProfileUp from './ProfileUp'
import ProfileDown from './ProfileDown'

const Profile = (props) => {
  return (
    <>
      <ProfileUp profileId={props.profileId} />
      <ProfileDown profileId={props.profileId} />
    </>
  )
}

export default Profile
