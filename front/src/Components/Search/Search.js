
import './Search.css'

const Search = () => {
    return <div className="search-container">
        <input type="text" className='search__input' placeholder="What you are looking for..."></input>
        <button className='search__buttons' type='submit'>Search</button>
        <button style={{backgroundColor: '#f14d54'}} className='search__buttons' type='button'>Cancle</button>
    </div>
}

export default Search
