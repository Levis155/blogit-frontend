import { MdModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom"
import { format } from 'date-fns';
import { FaCamera } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import apiUrl from "../../utils/apiUrl";
import "./MyProfileSection.css"
import randomUser from "../../assets/random-user.jpg";


function MyProfileSection() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["fetch-user-info"],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/profile`, {
        withCredentials: true,
      });
      return response.data;
    },
  });
  console.log(data);
  console.log(error);

  return (
    <section className="my-profile-section">
      <MyProfileHeader profilePicUrl={randomUser} firstName={data && data.firstName} lastName={data && data.lastName} joinDate={data && data.createdAt} />
      <PersonalDetailsCard data={data} />
      <ProfileDetailsCard data={data} />
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

function PersonalDetailsCard({data}) {
  return(
    <div className="profile-details-card">
      <p className="profile-details-title">personal information</p>
      <div className="profile-detail-cont">
        <ProfileDetail detailTitle="first name" detailSubtitle={data && data.firstName}/>
        <ProfileDetail detailTitle="last name" detailSubtitle={data && data.lastName}/>
        <ProfileDetail detailTitle="email address" detailSubtitle={data && data.emailAddress}/>
        <ProfileDetail detailTitle="username" detailSubtitle={data && data.userName}/>
      </div>
      <Link to="/edit-personal-info" className="edit-profile"><MdModeEditOutline /> update</Link>
    </div>
  )
}

function ProfileDetailsCard({data}) {
  return(
    <div className="profile-details-card">
      <p className="profile-details-title">profile information</p>
      <div className="profile-detail-cont">
        <ProfileDetail detailTitle="phone number" detailSubtitle={data?.phoneNumber || "----"} />
        <ProfileDetail detailTitle="occupation" detailSubtitle={data?.occupation || "----"}/>
        <ProfileDetail detailTitle="bio" detailSubtitle={data?.bio || "----"}/>
        <ProfileDetail detailTitle="secondary email" detailSubtitle={data?.secondaryEmail || "----"}/>
      </div>
      <Link className="edit-profile" to="/edit-profile-info"><MdModeEditOutline /> update</Link>
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
