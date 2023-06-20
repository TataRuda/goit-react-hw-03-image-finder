import { RotatingLines } from  'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
    return ( <div className={css.loader}>
        <RotatingLines
        strokeColor="grey"
        strokeWidth="6"
        width="160"
        />
        </div>
    );
};



