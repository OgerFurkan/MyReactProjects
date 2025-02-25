import React from 'react'
import "../css/searchBar.css"

function searchBar({location, setLocation, children}) {
  return (
  <div className="search-bar">
    <label htmlFor="search-input">
      <i className='search-icon'>
        {children}
      </i>
      </label>
    <input type="text" id='search-input' value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Lütfen Bir Şehir İsmi Giriniz"/>
  </div>
  )
}

export default searchBar