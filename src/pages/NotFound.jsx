import { useNavigate } from 'react-router-dom';
import errorImage from '../assets/error-404.png';
import styles from './NotFound.module.css';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className='h-screen flex flex-col'>
            <div className="flex-1 flex flex-col gap-5 items-center justify-center bg-gray-100 px-4">
                <img
                    src={errorImage}
                    alt="404 Not Found"
                    className="w-48 sm:w-64 md:w-80 h-auto mb-8"
                />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center">Oops, page not found!</h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-500 mb-8 text-center">The page you are looking for is not available.</p>
                <button
                    onClick={() => navigate('/')}
                    className={styles.primaryBtn}
                >
                    Go Back!
                </button>
            </div>
        </div>
    );
};