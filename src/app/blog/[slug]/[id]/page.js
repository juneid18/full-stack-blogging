"use client";
import { usePathname } from "next/navigation";
import { connect } from "@/dbconfig/dbconfig";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "../../page.module.css";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { GrBlog } from "react-icons/gr";
import { IoCreateOutline } from "react-icons/io5";
import Link from "next/link";
import {
  FacebookShare,
  TwitterShare,
  WhatsappShare,
  TelegramShare,
  InstapaperShare,
  PinterestShare,
} from "react-share-kit";


connect();

export default function BlogPage() {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);


  const pathname = usePathname();
  const [blogData, setblogData] = useState(null);

  // Split the pathname to extract the slug and id
  const pathParts = pathname?.split("/");
  const slug = pathParts?.[2]; // Assuming '/blog/slug/id', slug will be at index 2
  const id = pathParts?.[3]; // id will be at index 3

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const responce = await axios.post(
            "../../../api/users/viewblog",
            JSON.stringify({ id })
          );
          console.log(responce);
          setblogData(responce.data.data);
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        toast.error("Error in blog");
      }
    };
    fetchData();
  }, [id]);
  console.log(blogData);

  return (
    <>
      {/* <h1>Blog Slug: {slug}</h1>
      <h2>Blog ID: {id}</h2> */}
      <div className={style.container}>
        <div className={style.navbar}>
          <div className={style.logo}>
            <h1 className={style.h1}>
              <GrBlog /> Blogger
            </h1>
          </div>
          <div className={style.nav_buttons}>
            <Link href="/" className={style.createicon} title="Write">
              <IoCreateOutline />
            </Link>
            <Link href="/profile" className={style.profile_button}>
              Follow
            </Link>
          </div>
        </div>
        <h1 id={style.header}>{blogData?.title}</h1>
        <div className={style.meta}>
          <Image
            src={
              blogData?.authorImage ||
              "https://janefriedman.com/wp-content/uploads/2014/09/Example-of-a-Polished-Author-Portrait.png"
            }
            alt="Author Icon"
            width={100}
            height={100}
          />
          <div>
            <p>
              <b>{blogData?.username}</b>
            </p>
            <p>
              {blogData?.publishedAt
                ? format(parseISO(blogData.publishedAt), "MMMM dd, yyyy")
                : "Date not available"}
            </p>
            <p>
              <FacebookShare
                url={currentUrl}
              />
              <InstapaperShare 
                 url={currentUrl}
              />
              <TwitterShare
                url={currentUrl}
              />
              <WhatsappShare
                url={currentUrl}
              />
              <TelegramShare
                url={currentUrl}
              />
              <PinterestShare
                url={currentUrl}
              />
            </p>
          </div>
        </div>
        <div className={style.post_info}></div>
        <div className={style.image}>
          <Image
            src={blogData?.image}
            alt="Best Technology Blogs"
            width={100}
            height={100}
          />
        </div>
        <article id={style.article}>
          {blogData?.content || "No Content Available... "}
        </article>

        <ToastContainer />
      </div>
      <footer id={style.footer}>
        <div className={style.wrapper}>
          <small>
            &copy;2017 <strong id={style.strong}>Awesome Company</strong>, All
            Rights Reserved
          </small>
          <nav className={style.footer_nav}>
            <Link href="#">Back to Top</Link>
            <Link href="#">Terms of Use</Link>
            <Link href="#">Privacy</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
