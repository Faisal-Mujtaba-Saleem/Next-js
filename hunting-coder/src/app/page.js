"use client";
import AppHeader from "@/components/AppHeader";
import { useContext, useEffect, useState } from "react";
import { PostsContext } from "@/contexts/posts-context/context";
import Loading from "@/components/Loading";
import DisplayError from "@/components/DisplayError";
import LatestPosts from "@/components/LatestPosts";

const fetchPosts = async () => {
  try {
    const options = {
      method: 'GET',
    };

    const res = await fetch(`/api/posts/list/?limit=3`, options)
    if (!res?.ok) throw new Error(res.error);

    let { posts } = await res.json();
    return posts;

  } catch (error) {
    throw error;
  }
};

export default function Page() {
  const { blogposts, setBlogposts } = useContext(PostsContext);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (blogposts) {
      setIsLoading(true);

      fetchPosts()
        .then((posts) => {
          if (posts) {
            setBlogposts(posts);
          }
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [blogposts]);

  return (
    error ?
      <DisplayError error={error} /> :
      (
        <div className="container mx-auto py-20">
          <div className="absolute "></div>
          <main>
            <section className="max-w-7xl mx-auto">
              <AppHeader />

              {
                !isLoading ?
                  <LatestPosts /> :
                  <Loading />
              }
            </section>
          </main>
        </div>
      )
  );
}
