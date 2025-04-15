import "./MyProfileSection.css"
import randomUser from "../../assets/random-user.jpg";
import { MdModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom"
import { format } from 'date-fns';
import { FaCamera } from "react-icons/fa";
import useUserStore from "../../stores/userStore";

function MyProfileSection() {
  const user = useUserStore((state) => state.user)
  console.log(user)


  return (
    <section className="my-profile-section">
      <MyProfileHeader profilePicUrl={randomUser} firstName={user && user.firstName} lastName={user && user.lastName} joinDate={user && user.createdAt} />
      <PersonalDetailsCard />
      <ProfileDetailsCard />
      <Link to="/edit-password" className="update-pass-link"><MdModeEditOutline /> update password</Link>
    </section>
  )
}

function MyProfileHeader({ profilePicUrl, firstName, lastName, joinDate }) {

  const formattedDate = joinDate && !isNaN(new Date(joinDate)) 
  ? format(new Date(joinDate), "dd MMMM yyyy")
  : "----";

  return (
    <div>
      <div className="my-profile-header">
        <div className="user-avatar">
          <img src={profilePicUrl} alt="user avatar" />
        </div>
        <div className="my-profile-header-details">
          <div className="my-profile-header-name">
            {firstName} {lastName}
          </div>
          <div className="my-profile-header-date">
            joined: {formattedDate}
          </div>
        </div>
      </div>
      <button className="upload-photo-btn">upload photo <FaCamera /></button>
    </div>
  );
}

function ProfileDetailsCard() {
  const user = useUserStore((state) => state.user)
  return(
    <div className="profile-details-card">
      <p className="profile-details-title">profile information</p>
      <div className="profile-detail-cont">
        <ProfileDetail detailTitle="phone number" detailSubtitle={user?.phoneNumber || "----"} />
        <ProfileDetail detailTitle="occupation" detailSubtitle={user?.occupation || "----"}/>
        <ProfileDetail detailTitle="bio" detailSubtitle={user?.bio || "----"}/>
        <ProfileDetail detailTitle="secondary email" detailSubtitle={user?.secondaryEmail || "----"}/>
      </div>
      <Link className="edit-profile" to="/edit-profile-info"><MdModeEditOutline /> update</Link>
    </div>
  )
}

function PersonalDetailsCard() {
  const user = useUserStore((state) => state.user)

  return(
    <div className="profile-details-card">
      <p className="profile-details-title">personal information</p>
      <div className="profile-detail-cont">
        <ProfileDetail detailTitle="first name" detailSubtitle={user?.firstName || "----"}/>
        <ProfileDetail detailTitle="last name" detailSubtitle={user?.lastName || "----"}/>
        <ProfileDetail detailTitle="email address" detailSubtitle={user?.emailAddress || "----"}/>
        <ProfileDetail detailTitle="username" detailSubtitle={user?.username || "----"}/>
      </div>
      <Link to="/edit-personal-info" className="edit-profile"><MdModeEditOutline /> update</Link>
    </div>
  )
}

function ProfileDetail({detailTitle, detailSubtitle}) {
  return(
    <div className="profile-detail">
    <p className="profile-detail-title">{detailTitle}</p>
    <p className="profile-detail-subtitle">{detailSubtitle}</p>
  </div>
  )
}


export default MyProfileSection
