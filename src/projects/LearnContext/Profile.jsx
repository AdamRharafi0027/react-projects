{/* STEP 3: Consume Context (useContext) */}
import  { useContext } from 'react'
import UserContext from './Context'

const Profile = () => {
    const user = useContext(UserContext)
  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  )
}

export default Profile