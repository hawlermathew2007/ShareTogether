import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Error = ({ setError }) => {

  const { pathname } = useLocation()

  const navigate = useNavigate();

  useEffect(() => {
    setError(true)
  },[])

  const getTypeError = (error) => {
    if(error.includes('/error')){
      if(error.includes('userId')){
        return 'No user with this ID'
      } else if (error.includes('postId')) {
        return 'No post with this ID'
      } else if (error.includes('userInfo')) {
        return 'Unable to get User Info'
      } else if (error.includes('postInfo')) {
        return 'Unable to get Post Info'
      } else if (error.includes('logout')) {
        return 'Log out Errors'
      } else{
        return 'An Error occurs :('
      }
    }
    return 'Error 404 - Page Not Found'
  }

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div>
      <h1>{getTypeError(pathname)}</h1>
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
};

export default Error;