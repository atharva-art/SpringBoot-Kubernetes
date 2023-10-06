import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const AddBookmark = () => {

  const [title1, setTitle] = useState('');
  const [url1, setUrl] = useState('');
  const navigate = useNavigate();

  const handleRedirect = () => {
    // Redirect to the '/other' route
    navigate('/');
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  }

  const handleChangeUrl = (event) => {
    setUrl(event.target.value);
  }

  const saveBookmark = async (event) => {
    event.preventDefault();

    // Define the URL to which you want to send the POST request
    const url = 'http://localhost:8080/api/bookmark';

    // Define the data you want to send with the POST request
    const postData = {
      title: title1,
      url: url1,
    };

    try {
      // Make the POST request
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      handleRedirect();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }

  }


  return (
    <>
    <Navbar />
      <div className='container'>
        <div className='addBookmark'>
          <h1 className='addBookmark'>Add Bookmark</h1> 
          <input style= {{margin:"5%", padding:"2%"}} className="form-control" type="text" placeholder="Enter title" onChange={handleChangeTitle} />
          <input style= {{margin:"5%", padding:"2%"}} className="form-control" type="text" placeholder="Enter url" onChange={handleChangeUrl}/> 
          <button type="button" className="btn btn-outline-success btn-lg" onClick={(e) => saveBookmark(e)}>Save Bookmark</button>  
        </div>
      </div>
    </>
  )
}

export default AddBookmark