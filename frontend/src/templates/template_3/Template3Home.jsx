import { lazy, Suspense } from 'react';
import ScrollToTop from './components/ScrollToTop.jsx';
import AppFooter from './components/shared/AppFooter.jsx';
import AppHeader from './components/shared/AppHeader.jsx';
import './css/App.css';
// import './css/main.css';
import UseScrollToTop from './hooks/useScrollToTop.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));

function Template3Home() {
    return (
        <div className=" bg-secondary-light dark:bg-primary-dark transition duration-300">
            <ScrollToTop />
            <AppHeader />
            <Home />
            <AppFooter />
            <UseScrollToTop />
        </div>
    )
}

export default Template3Home
