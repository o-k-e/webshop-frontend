const Unauthorized = () => {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-[#953733] mb-4">Unauthorized</h1>
        <p className="text-lg text-gray-700 mb-6">
          You do not have permission to access this page.
        </p>
        <a href="/" className="text-[#953733] underline">
          Go back to homepage
        </a>
      </div>
    );
  };
  
  export default Unauthorized;