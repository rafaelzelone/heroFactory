import React from 'react';
import './pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {

  const pages = totalPages > 0 ? totalPages : 1;

  return (
    <div className="pagination-container">
      <button 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="pagination-arrow"
        aria-label="Página anterior"
      >
        &lt;
      </button>
      
      {[...Array(pages)].map((_, i) => {
        const pageNumber = i + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            disabled={pages === 1}
            className={`pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button 
        disabled={currentPage === pages}
        onClick={() => onPageChange(currentPage + 1)}
        className="pagination-arrow"
        aria-label="Próxima página"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;