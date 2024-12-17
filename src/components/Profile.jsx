import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import ProfileUp from './ProfileUp'
import ProfileDown from './ProfileDown'

const Profile = (props) => {
  const { profileId } = props
  console.log('Profile props', profileId)
  return (
    <Container>
      {/* <ProfileUp profile={profileId} /> */}
      <ProfileDown profileId={profileId} section='experiences' />
      <ProfileDown profileId={profileId} section='education' />
      <ProfileDown profileId={profileId} section='courses' />
    </Container>
  )
}

export default Profile
