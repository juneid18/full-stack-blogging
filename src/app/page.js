"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import { format, parseISO } from 'date-fns';
import { GrBlog } from "react-icons/gr";

export default function Home() {
  const [blogData, setBlogData] = useState([]);
  const [selectedTag, setSelectedTag] = useState('All');
  const [subemail, setEmail] = useState('');

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const childElement = document.getElementById('someElement');
      if (childElement && childElement.parentNode) {
        childElement.parentNode.removeChild(childElement);
      }
    }
  }, []); 

  const getBlogData = async () => {
    try {
      const res = await axios.post("/api/users/blogData");
      setBlogData(res.data.data);
    } catch (error) {
      toast.error("Error fetching blog data");
    }
  };

  useEffect(() => {
    getBlogData();
  }, []);

  const filterdBlogTag = selectedTag === 'All' ? blogData : blogData.filter(blog => blog.tag === selectedTag);

  const handleSubscribe = () => {
    if (subemail) {
      toast("Subscribed successfully", {
        position: "top-center",
        className: 'foo-bar'
      });
    } else {
      toast.error("Empty field");
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
      <div className={styles.main}>
        <div className={styles.navbar}>
          <div className={styles.logo}>
            <h1 className={styles.h1}><GrBlog /> Blogger</h1>
          </div>
          <div className={styles.nav_buttons}>
            <Link href="/createBlog" className={styles.get_started}>
              Get started
            </Link>
            <Link href="/profile" className={styles.profile_button}>
              <CgProfile />
            </Link>
          </div>
        </div>
        <div className={styles.latest_blogs}>
          <h2 className={styles.header_title}>Latest Blogs</h2>
          <p className={styles.paragraph}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever.
          </p>
          <br />
          <div className={styles.subscription}>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <button onClick={handleSubscribe}>Subscribe</button>
          </div>
        </div>
        <br />
        <nav className={styles.categories}>
          <button onClick={() => setSelectedTag('All')} className={styles.active}>All</button>
          <button onClick={() => setSelectedTag('Technology')} className={styles.btn}>Technology</button>
          <button onClick={() => setSelectedTag('Startup')} className={styles.btn}>Startup</button>
          <button onClick={() => setSelectedTag('Lifestyle')} className={styles.btn}>Lifestyle</button>
          <button onClick={() => setSelectedTag('Education')} className={styles.btn}>Education</button>
        </nav>
        <div className={styles.blog_list}>
          {Array.isArray(filterdBlogTag) && filterdBlogTag.map((blog, index) => (
            <div key={index} className={styles.blog_card}>
              <Link href={`/blog/${createSlug(blog.title)}/${blog._id}`} prefetch={false} style={{ textDecoration: 'none', color: 'black' }}>
                <Image
                  src={blog.image}
                  alt="Blog Image"
                  className={styles.blog_card_image}
                  width={300}
                  height={200}
                />
                <div className={styles.blog_card_content}>
                  <h2 className={styles.blog_card_title}>{blog.title}</h2>
                  <p className={styles.blog_card_description}>{blog.description}</p>
                  <span className={styles.blog_card_date}>
                    {format(parseISO(blog.publishedAt), "MMM d")}
                  </span>
                </div>
              </Link>
              <Link href={`/blog/${createSlug(blog.title)}/${blog._id}`} className={styles.blog_card_link}>
                Read More <FaArrowRight style={{ marginTop: '0.3rem', marginLeft: '6px', position: 'absolute' }} />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
      <footer id={styles.footer}>
        <div className={styles.wrapper}>
          <small>&copy;2017 <strong id={styles.strong}>Awesome Company</strong>, All Rights Reserved</small>
          <nav className={styles.footer_nav}>
            <Link href="#">Back to Top</Link>
            <Link href="#">Terms of Use</Link>
            <Link href="#">Privacy</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
