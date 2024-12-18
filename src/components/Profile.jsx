import React from 'react'
import ProfileUp from './ProfileUp'
import ProfileDown from './ProfileDown'

const Profile = (props) => {
  const { profileId } = props
  console.log('Profile props', profileId)

  return (
    <>
      <ProfileUp profileId={profileId} />

      <ProfileDown profileId={profileId} section='experiences' />
      {/* <ProfileDown profileId={profileId} section='experiences' />
      <ProfileDown profileId={profileId} section='education' />
      <ProfileDown profileId={profileId} section='courses' /> */}
    </>
  )
}

export default Profile
