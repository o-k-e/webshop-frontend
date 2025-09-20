interface Props {
    currentPage: number;
    totalPages: number;
    setPage: (page: number) => void;
  }
  
  const Pagination = ({ currentPage, totalPages, setPage }: Props) => {
    return (
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          « Prev
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
          className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Next »
        </button>
      </div>
    );
  };
  
  export default Pagination;