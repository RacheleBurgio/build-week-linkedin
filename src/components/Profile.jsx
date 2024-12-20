import React from 'react'
import ProfileUp from './ProfileUp'
import ProfileDown from './ProfileDown'
import ProfileContributes from './ProfileContributes'

const Profile = (props) => {
  const { profileId } = props
  console.log('Profile props', profileId)

  return (
    <>
      <ProfileUp profileId={profileId} />
      <ProfileDown profileId={profileId} section='experiences' />
      <ProfileContributes profileId={profileId} />
    </>
  )
}

export default Profile
