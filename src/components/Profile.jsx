import ProfileUp from './ProfileUp'
import ProfileDown from './ProfileDown'

useEffect(() => {
  fetchExperiences()
}, [props.profileId])

const Profile = (props) => {
  return (
    <>
      <ProfileUp profileId={props.profileId} />
      <ProfileDown profileId={props.profileId} />
    </>
  )
}

export default Profile
