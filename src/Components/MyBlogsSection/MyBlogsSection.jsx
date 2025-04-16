import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { NavLink, Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import blogsListingImg from "../../assets/blogs-listing-img.jpg";
import "./MyBlogsSection.css";
import apiUrl from "../../utils/apiUrl";

function MyBlogsSection() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["fetch-all-blogs-by-user"],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/blogs`, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  return (
    <section className="my-blogs-section">
      {isLoading && (
        <div className="loader-container">
          <PulseLoader size={30} color="#4b1e09" />
        </div>
      )}

      {isError && (
        <div className="error-container">
          <h1>error getting blogs.</h1>
        </div>
      )}

      {!isLoading && !isError && data.length === 0 && (
        <div className="start-writing">
          <h1>You don't have any blogs yet.</h1>
          <NavLink to="/write" className="create-new-link">
            Start writing
          </NavLink>
        </div>
      )}

      {!isLoading && !isError && data.length > 0 && (
        <>
          <NavLink to="/write" className="create-new-link">
            create new blog
          </NavLink>
          {data.map((item) => (
            <MyBlogsCard
              key={item.id}
              data={data}
              cardImg={blogsListingImg}
              cardTitle={item.title}
              publicationDate={item.createdAt}
              cardExcerpt={item.excerpt}
              to={`/edit-blog/${item.id}`}
              id={item.id}
            />
          ))}
        </>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </section>
  );
}

function MyBlogsCard({
  cardImg,
  cardTitle,
  publicationDate,
  cardExcerpt,
  to,
  id,
  data,
}) {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: ["delete-a-blog"],
    mutationFn: async () => {
      const response = await axios.delete(`${apiUrl}/blogs/${id}`, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Blog deleted successfully.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      queryClient.invalidateQueries({ queryKey: ["fetch-all-blogs-by-user"] });
    },
  });

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
        <p className="publication-date">
          published on: {format(new Date(publicationDate), "dd MMMM yyyy")}
        </p>
        <p className="my-blogs-card-excerpt">{cardExcerpt}</p>

        <div className="my-blogs-card-btns">
          <Link to={to}>
            <MdModeEditOutline
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Edit Blog"
            />
          </Link>
          <button onClick={handleDelete} disabled={isPending}>
            <RiDeleteBin5Line
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Delete Blog"
            />
          </button>
          <Tooltip id="my-tooltip" />
        </div>
      </div>
    </div>
  );
}

export default MyBlogsSection;
