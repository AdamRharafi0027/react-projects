import { useEffect, useState } from "react";
import bgImage from "../../../public/images/bg.jpg";

const BlogApp = () => {
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(6); 
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setPosts(json));
  }, []);

  const filtredSearch = posts.filter(post=>
    post.title.toLowerCase().includes(search.toLowerCase())
  )

  const loadMore = () => {
    setVisible((prev) => prev + 6);
  };
  const handleClear = () => {
    setSearch("")
  }

  return (
    <>
      <section className="flex flex-col w-full min-h-screen text-white py-10 px-5 md:px-20">
        {/* HEADER */}
        <header className="z-20 flex items-center justify-around ">
          <h1 className="text-5xl font-bold cursor-pointer">BLOGGER</h1>
          <div className="flex  gap-5">
            <input type="text" placeholder="Search..." 
            value={search}
            onChange={(e)=>{setSearch(e.target.value)}}
            className="bg-white rounded-full p-3 outline placeholder:text-gray-500 w-100 px-10 border-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/40 "
          />
          <button onClick={handleClear} className="cursor-pointer px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-300">clear</button>
          </div>
        </header>

        {/* HERO */}
        <div className="text-center relative">
          <img
            src={bgImage}
            className="fixed w-full h-full top-0 left-0 object-cover opacity-30"
            alt=""
          />
          <div className="z-10 relative">
            <h1 className="text-4xl md:text-7xl uppercase mt-20">
              Welcome to my blogging website
            </h1>
            <h3 className="text-xl md:text-3xl uppercase mt-6">
              Scroll down and you will find all news that you are looking for
            </h3>
            <button className="mt-10 bg-indigo-500 text-xl md:text-4xl cursor-pointer rounded-full px-8 py-4 hover:bg-indigo-600 transition">
              GET STARTED FOR FREE !
            </button>
          </div>
        </div>

        {/* BLOGS SECTION */}
        <div className="w-full my-20 z-10 pb-10 bg-purple-500 py-20 rounded-2xl">
          <div className="cards flex flex-wrap items-start justify-center gap-10 px-5 md:px-20">
            {posts.length > 0 &&
              filtredSearch.slice(0, visible).map((post, index) => {
                return (
                  <div
                    key={index}
                    className="max-w-sm bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
                  >
                    <img
                      src={bgImage}
                      alt="blog cover"
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-5">
                      <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        {post.title}
                      </h1>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.body}
                      </p>
                      <button className="cursor-pointer px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300">
                        Read More
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* LOAD MORE BUTTON */}
          {visible < posts.length && (
            <div className="text-center mt-10">
              <button
                onClick={loadMore}
                className="px-6 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-100 transition cursor-pointer"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogApp;
