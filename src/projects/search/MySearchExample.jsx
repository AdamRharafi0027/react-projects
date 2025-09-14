import { useEffect, useState } from "react";

const MySearchExample = () => {
  const [usernmes, setUsername] = useState([]);
  const [searchUsername, setSearchUsername] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsername(json));
  }, []);

  const filtredUsernames = usernmes.filter((user) =>
    user.name.toLowerCase().includes(searchUsername.toLowerCase())
  );
  return (
    <>
      <section className="flex flex-col items-center justify-center  h-screen w-full">
        <h1 className="text-3xl capitalize">search for usernames</h1>
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-sm p-2 my-5"
           value={searchUsername}
        onChange={(e) => setSearchUsername(e.target.value)}
        />
        <ul>
            {
                filtredUsernames.length > 0  ?
                 (
                    filtredUsernames.map((user, index) => {
                        return <li key={index}>{user.name}</li>
                    })
                 ) : 
                (<li>No Item Here</li>)
            }
        </ul>
      </section>
    </>
  );
};

export default MySearchExample;
