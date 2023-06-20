import PropsTypes from 'prop-types'; 
import css from './Button.module.css';

export const Button = ({onClick}) => {
    return (
        <button className={css.buttonLoad} type="button" onClick={onClick} >
          Load More
        </button>
    )
}

Button.propTypes = {
    onClick: PropsTypes.func.isRequired,
}