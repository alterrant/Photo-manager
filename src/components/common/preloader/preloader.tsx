import PreloaderStyles from './preloader.module.css';

function Preloader() {
    return (
        <div className={PreloaderStyles.preloader}>
            <div className={PreloaderStyles.spinner} />
        </div>
    );
}

export default Preloader;
