import Style from "./SearchInput.module.scss";
const SearchInput = ({ setSearchTerm, searchTerm, handleModal }) => {
  return (
    <div className={Style.input_wrap}>
      <div className="container">
        <div className={Style.wrap}>
          <input
            autoFocus
            type="text"
            placeholder="Search Here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleModal}
            type="button"
            className="btn-close"
            aria-label="Close"
            
          ></button>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
