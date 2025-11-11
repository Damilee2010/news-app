import React from 'react'

const NewsCard = ({ article }) => {
  return (
    <div className="card shadow-xl rounded-lg overflow-hidden">
     
        {article.urlToImage && (
          <figure>
            <img src={article.urlToImage||"/assets/react.svg"} alt={article.title} className="w-full h-48 object-cover"/> 
          </figure>
        )}
        <div className="card-body">
         
            <h2 className="card-title">{article.title}</h2>
            {article.source?.name &&(
                <p className='text-sm text-gray-500 mb-2'>
                  Source:  {article.source.name}
                </p>
            )}
            <p>{article.description}</p>
            <div className="card-actions justify-end mt-4">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read More</a>
            </div>
        </div>
    </div>
  );
};

export default NewsCard;
