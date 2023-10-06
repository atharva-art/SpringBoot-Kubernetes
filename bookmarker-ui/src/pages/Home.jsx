import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar';


const Home = () => {

    const [data, setdata] = useState(null);
    const [loading, setLoading] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [totalNumber, setTotalNumber] = useState([]);

    const numberOfPages = (pages) => {
        const numbers = [];
        console.log("pages " + pages);
        for (let i = 1; i <= pages; i++) {
            numbers.push(i);
        }
        console.log("numbers " + numbers);
        setTotalNumber(numbers);
    }   

  

  useEffect(() => {
    // Make a GET request to the Spring Boot endpoint
    fetch('http://localhost:8080/api/bookmark') // Replace with your actual endpoint URL
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {
        setdata(data); // Update the state with the data received
        setLoading(false); // Set loading to false
        numberOfPages(data.totalPages)
        console.log("Number of pages " + data.totalPages);
        console.log(data); //
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setLoading(false); // Set loading to false
      });
  }, []); 

  const searchData = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true while fetching data
  
    // Make a GET request to the Spring Boot endpoint with the search query
    fetch(`http://localhost:8080/api/bookmark?query=${inputValue}`) // Replace with your actual endpoint URL
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((searchResults) => {
        setdata(searchResults); // Update the state with the search results
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setLoading(false); // Set loading to false
      });
  }

  const handleChange = (event) => {
    // Update the inputValue state whenever the input field changes
    setInputValue(event.target.value);
  };

  const handlePage = (event,number) => {
    event.preventDefault();
    setLoading(true); // Set loading to true while fetching data
    
    if(number === -1) {
        if(data.hasPrevious && !data.isFirst){
            number = data.currentPage-1
        }else{
            number = 1
        }
    }else if(number === -2) {
        if(data.hasNext && !data.isLast){
            number = data.currentPage + 1
        }else{
            number = data.currentPage
        }
    }

    // Make a GET request to the Spring Boot endpoint with the search query
    fetch(`http://localhost:8080/api/bookmark?page=${number}`) // Replace with your actual endpoint URL
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((searchResults) => {
        setdata(searchResults); // Update the state with the search results
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setLoading(false); // Set loading to false
      });

  }



  return (
    <>
    <Navbar />
        <div className="container ">
            <div className='searchForm'>
                <form className="row">
                    <div className="col-3">
                        <input type="text" id="staticEmail" readOnly className="form-control-plaintext custom-text-right" value="Search for Bookmark : " />
                    </div>
                    <div className="col-6">
                        <input type="text" id="inputSearch" className="form-control" placeholder="Search...." onChange={handleChange}/>
                    </div>
                    <div className="col-auto">
                        <button id="searchButton" className="btn btn-primary" onClick={(e)=>searchData(e)}>Search</button>
                    </div>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <ul>
                            {data.data.map((item) => (
                                <div className="card" style={{marginTop:'5%'}} key={item.id}>
                                    <div className="card-header"><a href={item.url}>{item.url}</a></div>
                                    <div className="card-body">
                                    <blockquote className="blockquote mb-0">
                                        <p>{item.title}</p>
                                        <footer className="blockquote-footer"><cite title="Source Title">{item.createdAt.slice(0,10).replace(/-+/g,"/")}</cite></footer>
                                    </blockquote>
                                </div>
                              </div>
                            ))}
                            </ul>
                        )}
                </form>
            </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" onClick={(e)=>handlePage(e,-1)}>Previous</a></li>
                        {totalNumber.map((number, index) => (
                            <li className="page-item"  key={index}><a className="page-link" onClick={(e)=>handlePage(e,number)}>{number}</a></li>
                        ))}
                        <li className="page-item"><a className="page-link" onClick={(e)=>handlePage(e,-2)}>Next</a></li>
                    </ul>
                </nav>
            </div>
  </>
  )
}

export default Home