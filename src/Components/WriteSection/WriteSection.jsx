import "./WriteSection.css"
import ImageUploader from "../ImageUploader/ImageUploader";

function WriteSection() {
  return (
    <section className="write-section">
      <form action="" className="write-form">
        <p className="write-form-title">write your thoughts!</p>
        <ImageUploader />
        <TitleInput label="blog title" inputType="text" id="titleInput" placeHolder="Provide a title to your blog. Try and make it relatively short and catchy."/>
        <ExcerptInput label="blog excerpt" id="excerpt-input" placeHolder="Provide a brief excerpt to the blog. Give a comprehensive but brief preview to your blog." />
      </form>
    </section>
  )
}

function TitleInput({
    label,
    inputType,
    id,
    placeHolder,}) {
    return (
      <div className="title-input">
        <label>{label}</label>
        <input type={inputType} id={id} placeholder={placeHolder} />
      </div>
    );
  }

  function ExcerptInput({
    label,
    id,
    placeHolder,}) {
    return (
      <div className="excerpt-input">
        <label>{label}</label>
        <textarea id={id} placeholder={placeHolder} />
      </div>
    );
  }

export default WriteSection
