import "./MyBlogsSection.css";
import { NavLink, Link } from "react-router-dom";
import { Tooltip } from 'react-tooltip';
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import blogsListingImg from "../../assets/blogs-listing-img.jpg";
import apiUrl from "../../utils/apiUrl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function MyBlogsSection() {

  const { isLoading, data } = useQuery({
    queryKey: ["fetch-all-blogs-by-user"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/blogs`, {withCredentials: true})
      console.log(response);
      return response.data;
    }
  })

  return (
    <section className="my-blogs-section">
      <NavLink to="/write" className="create-new-link">create new blog</NavLink>
      {data && data.map((item) => <MyBlogsCard key={item.id} data={data} cardImg={blogsListingImg} cardTitle={item.title} publicationDate="11 april 2025" cardExcerpt={item.excerpt} to={`/edit-blog/${item.id}`} id={item.id} />)}
    </section>
  )
}

function MyBlogsCard({cardImg, cardTitle, publicationDate, cardExcerpt, to, id, data}) {

  const queryClient = useQueryClient();

  const {isPending, mutate} = useMutation({
    mutationKey: ["delete-a-blog"],
    mutationFn: async () => {
      const response = await axios.delete(`${apiUrl}/blogs/${id}`, {withCredentials: true});
      return response.data;
    },
    onSuccess: () => {
      console.log("Deleted blog successfully.");
      queryClient.invalidateQueries({queryKey: ["fetch-all-blogs-by-user"]})
    }
  })

  function handleDelete() {
    mutate();
  }
  return (
    <div className="my-blogs-card">
      <div className="my-blogs-card-img">
        <img src={cardImg} alt="blog image" />
      </div>

      <div className="my-blogs-card-content">
        <p className="my-blogs-card-title">{cardTitle}</p>
        <p className="publication-date">published on: {publicationDate}</p>
        <p className="my-blogs-card-excerpt">{cardExcerpt}</p>

        <div className="my-blogs-card-btns">
          <Link to={to}><MdModeEditOutline data-tooltip-id="my-tooltip" data-tooltip-content="Edit Blog"/></Link>
          <button onClick={handleDelete} disabled={isPending}><RiDeleteBin5Line data-tooltip-id="my-tooltip" data-tooltip-content="Delete Blog"/></button>
          <Tooltip id="my-tooltip" />
        </div>
      </div>
    </div>
  )
}

export default MyBlogsSection
