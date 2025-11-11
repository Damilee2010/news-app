import React from "react";
import { useState, useEffect } from "react";
import CategorySelect from "./components/CategorySelect";
import NewsList from "./components/NewsList";
import Pagination from "./components/Pagination";

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("general");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const API_KEY = process.env.VITE_NEWS_API_KEY;
  const PAGE_SIZE = 20;

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${PAGE_SIZE}&page=${currentPage}&apiKey=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === "error") {
        throw new Error(data.message);
      }

      const articles = data.articles || [];
      setNews(articles);
      setTotalResults(data.totalResults || 0);
      setTotalPages(Math.ceil(data.totalResults / PAGE_SIZE));
    } catch (err) {
      setError("Failed to fetch news articles: " + err.message);
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category, currentPage]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  const handlePrev = ()=> {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  const handleNext = ()=> {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  }

 
  return (
    <div className="min-h-screen bg-base-200">
      <header className="bg-primary text-primary-content p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">News App</h1>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="mb-6">
          <CategorySelect category={category} onCategoryChange={handleCategoryChange} />
        </div>
        <div className="mb-6 text-center">
          <p className="text-lg">Total Results: {totalResults}</p>
        </div>

        {loading && (
          <div className="flex justify-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        )}
        {error && <div className="alert alert-error">{error}</div>}
        {!loading && !error && (
          <>
            <NewsList articles={news} />
           {totalPages > 1 && (
  <div className="flex justify-center mt-6">
    <Pagination currentPage={currentPage} totalPages={totalPages} onPrev={handlePrev} onNext={handleNext} />
  </div>)}
           
          </>
        )}
      </main>
    </div>
  );
}

export default App;