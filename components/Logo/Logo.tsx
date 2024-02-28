import classes from './Logo.module.css';

const Logo = () => {
    return (
        <div className={classes.logo} >
            <h1>StoneX<span>Customer Manager</span></h1>
        </div>   
    )
}

export {Logo}