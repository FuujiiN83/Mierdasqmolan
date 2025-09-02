'use client';

import { PaginationProps } from '@/types';

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  loading = false, 
  className = '' 
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const maxVisiblePages = 5;
  const halfVisible = Math.floor(maxVisiblePages / 2);
  
  let startPage = Math.max(1, currentPage - halfVisible);
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 }, 
    (_, i) => startPage + i
  );

  const handlePageClick = (page: number) => {
    if (page !== currentPage && !loading) {
      onPageChange(page);
    }
  };

  const baseButtonClass = "px-3 py-2 text-sm font-medium rounded-md transition-all duration-200";
  const activeButtonClass = "bg-primary-600 text-white shadow-md";
  const inactiveButtonClass = "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400";
  const disabledButtonClass = "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed";

  return (
    <nav className={`flex items-center justify-center space-x-2 ${className}`} role="navigation" aria-label="Paginación">
      {/* Botón anterior */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className={`${baseButtonClass} ${
          currentPage === 1 || loading ? disabledButtonClass : inactiveButtonClass
        }`}
        aria-label="Página anterior"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Primera página + elipsis */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => handlePageClick(1)}
            disabled={loading}
            className={`${baseButtonClass} ${loading ? disabledButtonClass : inactiveButtonClass}`}
            aria-label="Página 1"
          >
            1
          </button>
          {startPage > 2 && (
            <span className="px-2 py-2 text-gray-500">...</span>
          )}
        </>
      )}

      {/* Páginas visibles */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          disabled={loading}
          className={`${baseButtonClass} ${
            page === currentPage 
              ? activeButtonClass 
              : loading 
                ? disabledButtonClass 
                : inactiveButtonClass
          }`}
          aria-label={`Página ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {/* Elipsis + última página */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-2 py-2 text-gray-500">...</span>
          )}
          <button
            onClick={() => handlePageClick(totalPages)}
            disabled={loading}
            className={`${baseButtonClass} ${loading ? disabledButtonClass : inactiveButtonClass}`}
            aria-label={`Página ${totalPages}`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Botón siguiente */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        className={`${baseButtonClass} ${
          currentPage === totalPages || loading ? disabledButtonClass : inactiveButtonClass
        }`}
        aria-label="Página siguiente"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
}

export function ResultsInfo({ 
  currentPage, 
  itemsPerPage, 
  totalItems, 
  className = '' 
}: {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  className?: string;
}) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={`text-sm text-gray-600 font-preahvihear ${className}`}>
      Mostrando {startItem}-{endItem} de {totalItems} productos
    </div>
  );
}







