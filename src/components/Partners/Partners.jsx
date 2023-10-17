
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../hoc/AuthProvider';
import LinkIcon from '@mui/icons-material/Link';
import config from '../../settings/settings';

const Partners = ({dataCard}) => {

  const {store} = useContext(AuthContext);

    return(
        <>
        {  store.isAuth ? 
            <Link to={`/partners/details/${dataCard._id}`}> 
                <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col 
                    justify-around items-center p-8 h-full">
                    <div className="p-4">
                            {dataCard?.logo__img?.length > 0 && <img src={`${config?.baseUrlUpload}/uploads/logo/${dataCard.logo__img[0]?.filename}`} alt=""
                                className="object-cover"
                            />}
                    </div>
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{dataCard?.org}</div>
                        <p className="text-gray-700 text-base">
                            {dataCard?.cities} {dataCard?.html__href && <LinkIcon fontSize='large'/>}
                        </p>
                    </div>
                </div>
            </Link> 
            :
            <a href={!dataCard.html__href == '' ? dataCard.html__href : null} target="_blank" rel="noopener noreferrer">
                <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col 
                    justify-around items-center p-8 h-full">
                    <div className="p-4">
                            {dataCard?.logo__img?.length > 0 && <img src={`${config?.baseUrlUpload}/uploads/logo/${dataCard.logo__img[0]?.filename}`} alt=""
                                className="object-cover"
                            />}
                    </div>
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{dataCard?.org}</div>
                        <p className="text-gray-700 text-base">
                            {dataCard?.cities} {dataCard?.html__href && <LinkIcon fontSize='large'/>}
                        </p>
                    </div>
                </div>
            </a>
        }
        </>

    )
};

export default Partners;
