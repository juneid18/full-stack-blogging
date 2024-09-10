"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./page.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CldImage } from 'next-cloudinary';

export default function CreateBlog() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState(""); // Initialize imageURL here
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    tag: "",
    publishAt: "",
    image: "",
  });
  const [ButtonDisable, setButtonDisable] = useState(true);

  const SubmitHandle = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Check if all required fields are filled
    if (!blog.title || !blog.content || !blog.tag) {
      toast.error("All fields must be filled");
      return;
    }

    try {

      const response = await axios.post("../api/users/createBlog", blog);
      console.log(response);
      toast.success("Blog is added successfully");
      router.push("/");
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  const handleFileUpload = async (files) => {
    setLoading(true); // Set loading to true when starting the upload
    try {
      if (files) {
        const formData = new FormData();
        Array.from(files).forEach((file) => {
          formData.append("file", file);
        });
  
        const response = await fetch("../api/users/upload", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error("Failed to upload file");
        }
  
        const result = await response.json();
        console.log(result); // Log the result to inspect the response
  
        if (result.success) {
          toast.success("Upload successful: " + result.url);
          setImageURL(result.url); // Set the URL of the uploaded image
          setBlog(prevBlog => ({ ...prevBlog, image: result.url })); // Update blog state with image URL
        } else {
          toast.error("Upload failed");
        }
      }
    } catch (error) {
      toast.error("Upload error: " + error.message);
    } finally {
      setLoading(false); // Set loading to false when the upload is finished
    }
  };
  

  useEffect(() => {
    setButtonDisable(
      !(blog.title && blog.content && blog.tag)
    );
  }, [blog]);

  return (
    <>
      <div className={style.main_container}>
        <div className={style.container}>
          <h1 id={style.header}>Create a New Blog Post</h1>
          <form className={style.blog_form} onSubmit={SubmitHandle}>
            <div className={style.form_group}>
              <label id={style.lable}>Title:</label>
              <input
                type="text"
                id={style.title}
                name="title"
                value={blog.title}
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                required
              />
            </div>
            <div className={style.form_group}>
              <label id={style.lable}>Content:</label>
              <textarea
                id={style.content}
                name="content"
                rows="6"
                value={blog.content}
                onChange={(e) => setBlog({ ...blog, content: e.target.value })}
                required
              ></textarea>
            </div>
            <div className={style.form_group}>
              <label id={style.lable}>Tags:</label>
              <select
                id="tags"
                name="tags"
                value={blog.tag}
                onChange={(e) => setBlog({ ...blog, tag: e.target.value })}
                className={style.dropdown}
                required
              >
                <option value="">Select a tag</option>
                <option value="Technology">Technology</option>
                <option value="Startup">Startup</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Education">Education</option>
              </select>
            </div>
            <div className={style.form_group}>
              <input
                type="file"
                name="file"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
              {loading && <p>Loading...</p>} {/* Displays loading text when uploading */}
            </div>
            <button
              type="submit"
              id={style.btn}
              style={{
                backgroundColor: ButtonDisable ? "#ccc" : "#007bff",
                color: ButtonDisable ? "#666" : "#fff",
                cursor: ButtonDisable ? "not-allowed" : "pointer",
                opacity: ButtonDisable ? "0.6" : "1",
                boxShadow: ButtonDisable ? "none" : "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
              disabled={ButtonDisable}
            >
              Add Post
            </button>
          </form>
        </div>
        <ToastContainer />
        {imageURL ? <CldImage src={imageURL} width="500" height="500" crop="auto" /> : "no Image added"}
      </div>
    </>
  );
}
