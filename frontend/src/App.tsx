import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Signin from "./Pages/signin"
import Signup from "./Pages/signup"
import Blog from "./Pages/blog"
import Blogs from "./Pages/Blogs"
import YourBlog from "./Pages/YourBlogs"
import UpdateBlog from "./Pages/UpdateBlog"
import Publish from "./Pages/PublishBlog"

function App() {
  

  return (
    <>
     <Router>
      <Routes>
          <Route path="/signin" element = {<Signin/>}/>
          <Route path = "/signup" element = {<Signup/>} />
          <Route path = "/blog/:id" element = {<Blog/>} />
          <Route path = "" element = {<Blogs/>} />
          <Route path ="/blog/yours" element = {<YourBlog/>} />
          <Route path = "/blog/update/:id" element = {<UpdateBlog />} />
          <Route path = "/blog/publish" element = {<Publish/>} />
      </Routes>
     </Router>
    </>
  )
}

export default App
