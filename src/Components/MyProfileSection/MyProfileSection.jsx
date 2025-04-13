import "./MyProfileSection.css"
import randomUser from "../../assets/random-user.jpg";
import { MdModeEditOutline } from "react-icons/md";

function MyProfileSection() {
  return (
    <section className="my-profile-section">
      <MyProfileHeader />
      <ProfileDetailsCard />
      <PersonalDetailsCard />
      <button className="update-pass-btn"><MdModeEditOutline /> update password</button>
    </section>
  )
}

function MyProfileHeader() {
  return(
    <div className="my-profile-header">
    <div className="user-avatar">
      <img src={randomUser} alt="user avatar" />
    </div>
    <div className="my-profile-header-details">
      <div className="my-profile-header-name">john doe</div>
      <div className="my-profile-header-date">joined: 11 April 2025</div>
    </div>
  </div>
  )
}

function ProfileDetailsCard() {
  return(
    <div className="profile-details-card">
    <p className="profile-details-title">profile information</p>

    <div className="profile-detail-cont">
      <div className="profile-detail">
        <p className="profile-detail-title">phone number</p>
        <p className="profile-detail-subtitle">0722946213</p>
      </div>
      <ProfileDetail detailTitle="phone number" detailSubtitle="0722946213"/>
      <ProfileDetail detailTitle="occupation" detailSubtitle="engineer"/>
      <ProfileDetail detailTitle="gender" detailSubtitle="male"/>
      <ProfileDetail detailTitle="email" detailSubtitle="test@email.com"/>
      <ProfileDetail detailTitle="gender" detailSubtitle="male"/>
    </div>

    <button className="edit-profile"><MdModeEditOutline /> update</button>
  </div>
  )
}

function PersonalDetailsCard() {
  return(
    <div className="profile-details-card">
    <p className="profile-details-title">personal information</p>

    <div className="profile-detail-cont">
    <ProfileDetail detailTitle="phone number" detailSubtitle="0722946213"/>
      <ProfileDetail detailTitle="occupation" detailSubtitle="engineer"/>
      <ProfileDetail detailTitle="gender" detailSubtitle="male"/>
      <ProfileDetail detailTitle="email" detailSubtitle="test@email.com"/>
      <ProfileDetail detailTitle="gender" detailSubtitle="male"/>
    </div>

    <button className="edit-profile"><MdModeEditOutline /> update</button>
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
