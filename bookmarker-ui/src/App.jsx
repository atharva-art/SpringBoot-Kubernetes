import './App.css'
import AddBookmark from './components/AddBookmark'
import Home from './pages/Home';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Home />} />
      <Route path="add" element={<AddBookmark />} />
      {/* <Route path="swipe" element={<Swipe />} /> */}
    </Route>
  )
)

function App() {
  return (
    <> 
      <RouterProvider router={router}/>
    </>
    
  )
}

export default App
