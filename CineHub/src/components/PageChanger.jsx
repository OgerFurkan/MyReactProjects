import React, { useEffect,useState } from 'react'
import { IoIosArrowDroprightCircle,IoIosArrowDropleftCircle } from "react-icons/io";
import "../css/page-changer.css"

function PageChanger({page,setPage}) {

    const [customPageNumber, setCustomPageNumber] = useState(page);
    const [isCustomPageNumber, setIsCustomPageNumber] = useState(false);

    useEffect(() => {
        setCustomPageNumber(page);
    }, [page]);


    const scrollToTop = () => {
            window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const handlePageNumber=(type)=>{
      if(page === 1 && type==="decrement"){
        setPage(1)
      }
      else if(type==="decrement"){
        setPage(Number(page)-1)
        
      }
      else{
        setPage(Number(page)+1)
      }
    }
    const handlePageBlur=()=>{
      const value = Number(customPageNumber)
      if(!isNaN(value) && value>0 ){
        setPage(value)
        setIsCustomPageNumber(!isCustomPageNumber)
      }
      else{
        setPage(1)
        setIsCustomPageNumber(page)
        setIsCustomPageNumber(!isCustomPageNumber)
      }
    }
    const handleKeyDown = (e) => {
          if (e.key === 'Enter'){
            handlePageBlur();
            scrollToTop()
          }
          
    };

  return (
    <div className="page-changer">
        <i onClick={()=>{handlePageNumber("decrement"),scrollToTop()}}><IoIosArrowDropleftCircle className='page-changer-icon'/></i>
        <span className='page-number unselected'>{page <= 1 ? "-" :Number(page)-1}</span>
             {
                isCustomPageNumber
                ?
                  <input className="page-number-input" type="number" min={1} value={customPageNumber} onChange={(e)=>setCustomPageNumber(e.target.value)} onBlur={()=>handlePageBlur()} onKeyDown={(e)=>handleKeyDown(e)}/>
                : 
                  <span title='Click for enter a page number' className='page-number selected' onClick={()=>setIsCustomPageNumber(!isCustomPageNumber)}>{page}</span>
            }
        <span className='page-number unselected'>{Number(page)+1}</span>
        <i type='button' onClick={()=>{handlePageNumber("increment"),scrollToTop()}}><IoIosArrowDroprightCircle  className='page-changer-icon'/></i>
    </div>
  )
}

export default PageChanger