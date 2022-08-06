import PreloaderStyles from './preloader.module.css';

export const Preloader = () => {
    return (
        <div className={PreloaderStyles.preloader}>
            <div className={PreloaderStyles.spinner} />
        </div>
    );
};
