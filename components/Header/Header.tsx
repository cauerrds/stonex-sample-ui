import { Logo } from '../Logo/Logo';
import classes from './Header.module.css';

const Header = () => {
    return (
        <header className={classes.header} >
            <div className={classes.container}>
                <Logo />
            </div>
        </header>   
    )
}

export {Header}