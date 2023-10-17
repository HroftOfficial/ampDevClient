import Fancybox from "./Fancybox";

const DraftSlider = ({photo_url}) =>{
    return(  
          // <Fancybox options={{'Dots':true,inline:true}} >
          // <p>
          // {photo_url.map((p, index)=> 
          // <button     
          // data-fancybox="gallery"
          // data-src={`https://b2b.copartner.ru/uploads/${p.filename}`} 
          // key={index}
          // className='h-auto'
          // >text
          //   {/* <img src={`https://b2b.copartner.ru/uploads/${p.filename}`}  alt="" /> */}
          //   </button>
          //   )}
          //   </p>
          // </Fancybox>  
          <Fancybox options={{ infinite: false }}>
  <p>
    <button
      data-fancybox="gallery"
      data-src="https://lipsum.app/id/1/800x600"
      className="button button--secondary"
    >
      Image #1
    </button>

    <button
      data-fancybox="gallery"
      data-src="https://lipsum.app/id/2/800x600"
      className="button button--secondary"
    >
      Image #2
    </button>
  </p>
</Fancybox>
    )
}

export default DraftSlider;