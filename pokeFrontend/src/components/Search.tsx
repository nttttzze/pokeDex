function Search() {
  return (
    <>
      <h1>idk</h1>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        rel="stylesheet"
      ></link>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="search-container">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search..."
              ></input>
              <i className="fas fa-search search-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Search;
