"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { MdVerified } from "react-icons/md";
import { GrBlog } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowRight } from "react-icons/fa";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { IoCreate } from "react-icons/io5";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [blogData, setBlogData] = useState([]);


  useEffect(() => {
  const GetUserDetail = async () => {
    try {
      const res = await axios.post("/api/users/me");
      setData(res.data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  GetUserDetail();
}, []);

  useEffect(() => {
  const fetchUserBlog = async () => {
    if (data?._id) {
      try {
        const userBlogResponse = await axios.post("/api/users/userBlogs", {
          id: data._id,
        });
        setBlogData(userBlogResponse.data.data);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  fetchUserBlog();
}, [data]);



 


  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const sendUserMail = async () => {
    try {
      await axios.post("/api/users/sendMail", {
        email: data.email,
        emailType: "VERIFY",
        userId: data._id,
      });
      toast.success("Verification mail sent!");
    } catch (error) {
      toast.error("Failed to send verification mail.");
    }
  };

  function createSlug(text) {
    return text
      .toLowerCase()                // Convert to lowercase
      .trim()                       // Remove leading and trailing spaces
      .replace(/[\s\W-]+/g, '-')    // Replace spaces and non-word characters with hyphens
      .replace(/^-+|-+$/g, '');     // Remove leading and trailing hyphens
  }

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <h1 className={styles.h1}>
            <GrBlog /> Blogger
          </h1>
        </div>
        <div className={styles.nav_buttons}>
          <Link href="/createBlog" className={styles.get_started}>
            Create <IoCreate style={{ fontSize: '20px' }} />
          </Link>
        </div>
      </div>
      <div className={styles.Main_container}>
        <div className={styles.profile_page}>
          <aside className={styles.sidebar}>
            <div className={styles.user_info}>
              <h2 title={data?.username} className={styles.user_name}>
                {data?.username}
                {data?.isVerified ? (
                  <MdVerified title="Verified" className={styles.verified} />
                ) : (
                  <>
                    <MdVerified title="Not Verified" className={styles.notVerified} />
                    <br />
                    <button onClick={sendUserMail} className={styles.verifyButton}>
                      Verify your email
                    </button>
                  </>
                )}
              </h2>
              <p title={data?.email} className={styles.user_email}>{data?.email}</p>
            </div>
            <nav className={styles.nav_menu}>
              <ul>
                <li>
                  <button className={styles.nav_link} onClick={() => {/* handle settings */}}>
                    Settings
                  </button>
                </li>
                <li>
                  <button onClick={logout} className={styles.nav_link}>
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          <main className={styles.content_area}>
            <header className={styles.content_header}>
              <h1 className={styles.content_title}>Your Blogs</h1>
            </header>
            <section className={styles.posts_section}>
              <div className={styles.blog_list}>
                {Array.isArray(blogData) &&
                  blogData.map((blog, index) => (
                    <Link
                      key={index}
                      href={`/blog/${createSlug(blog.title)}/${blog._id}`}
                      prefetch={false}
                      className={styles.blog_card_link}
                    >
                      <div className={styles.blog_card}>
                        <Image
                          src={blog.image}
                          alt="Blog Image"
                          className={styles.blog_card_image}
                          width={300}
                          height={200}
                          priority 
                        />
                        <div className={styles.blog_card_content}>
                          <h2 className={styles.blog_card_title}>{blog.title}</h2>
                          <p className={styles.blog_card_description}>{blog.description}</p>
                          <div className={styles.blog_card_footer}>
                            <span className={styles.blog_card_date}>
                              {format(parseISO(blog.publishedAt), "MMM d")}
                            </span>
                            <FaArrowRight
                              style={{
                                marginTop: "0.3rem",
                                marginLeft: "6px",
                                position: "relative",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </section>
          </main>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
