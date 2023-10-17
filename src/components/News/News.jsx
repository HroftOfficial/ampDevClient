import { Link } from "react-router-dom";

const News = ({index, img, title, id, ...props}) => {
    return(
        <div className="trans relative mx-auto w-full flex justify-center items-center bg-gray-50 ">
            <Link to={id}>
                <div className="flex justify-center">

                    <img src={img} alt="news" 
                        className="object-contain "
                    />

                    <div className="absolute bottom-0 left-0 bg-opacity-80 bg-gray-700 p-2 w-full flex justify-between items-center">                   
                        <p className="py-1 ax-w-max text-md truncate ...">
                            {title}
                        </p>
                        {/* {props?.date && 
                            <div className="text-sm text-right ">
                                {new Date(props?.date).toLocaleDateString('ru-RU')}
                            </div>
                        } */}
                    </div>
        
                </div>
            </Link>
        </div>
    )
};

export default News;
