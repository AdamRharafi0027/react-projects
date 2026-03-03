import BlogApp from "./projects/blogApp/BlogApp"
import FilterProducts from "./projects/filterProducts/FilterProducts"
import MySearchExample from "./projects/search/MySearchExample"
import Todo from "./projects/todoApp/Todo"
import WeatherApp from "./projects/weatherApp/WeatherApp"
import UserContext from "./projects/LearnContext/Context"
import Profile from "./projects/LearnContext/Profile"

const User = {
  name: "Adam",
  age: 30,
}

const App = () => {
  return (
    <>
      {/* <Todo /> */}
      {/* <WeatherApp /> */}
      {/* <MySearchExample /> */}
      {/* <BlogApp /> */}
      {/* <FilterProducts /> */}
      <UserContext.Provider value={User}>
<Profile />
      </UserContext.Provider>
    </>
  )
}

export default App