import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop({ history }) {

    let location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.getElementById('collapseMenu').classList.remove('show');
    }, [location.pathname]);

    return (null);
}

export default ScrollToTop;