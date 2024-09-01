import { useEffect, useRef, useState } from 'react';
import './Nav.css';
import NavBrand from './NavBrand';
import { scrollToHash } from '../ScrollToHash/ScrollToHash';
import { Link } from 'react-router-dom';

import Lottie from 'lottie-react'
import vision from '../../assets/animations/vision.json';
import fireDrops from '../../assets/animations/fire-drops.json';
import navmenu from '../../assets/animations/navmenu.json';

function Nav() {
    const lottieMenu = useRef();
    const [navHidden, setNavHidden] = useState(true)
    const lottieAnimations = useRef([]);
    const tlMenu = useRef(null);
    const navbarBtn = useRef(null);

    useEffect(() => {

        const mm = gsap.matchMedia();
        
        mm.add('(max-width:1200px)', () => {

            tlMenu.current = gsap.timeline({paused:true})
            .to(navbarBtn.current, {
                display: 'flex',
                duration: .1,
            })
            .fromTo(navbarBtn.current, {
                clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
                
            }, {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                duration: .5,
                ease: 'power2.inOut'
            })
            .to(navbarBtn.current, {
                background: '#000',
                duration: .5,
                ease: 'power2.inOut'
            })

        });

        setTimeout(() => {
            document.querySelectorAll('.navhash[href]').forEach(a => {
                a.addEventListener('click', e => {
                    scrollToHash(getSamePageAnchor(a), e);
                });
            });
        }, 1000)
    }, []);

    const setLottieRef = (index) => (el) => {
        lottieAnimations.current[index] = el;
    };

    function getSamePageAnchor(link) {
        if (
            link.protocol !== window.location.protocol ||
            link.host !== window.location.host ||
            link.pathname !== window.location.pathname ||
            link.search !== window.location.search
        ) {
            return false;
        }

        return link.hash;
    }

    function openNav() { 
        
        if (navHidden) {
            tlMenu.current.play();  
            setNavHidden(false);
            lottieMenu.current.setDirection(1);
            lottieMenu.current.play();
            gsap.to('body', {
                overflowY: 'hidden',
            })
        } else {
            tlMenu.current.reverse();
            setNavHidden(true);
            lottieMenu.current.setDirection(-1);
            lottieMenu.current.play();
            gsap.to('body', {
                overflowY: 'auto',
            })
        }
    }

    return (
        <>
            <div className='navbarBtn' onClick={() => { openNav() }}>
                <Lottie lottieRef={lottieMenu} animationData={navmenu} autoplay={false} loop={false} style={{ filter: 'invert(100%)', width: 50 }}></Lottie>
            </div>
            <nav className="navbar" aria-hidden={navHidden} ref={navbarBtn}>
                <NavBrand></NavBrand>
                <div className='navbarLinks'>
                    <Link to={'/drops'} className='navlink'><span>Drops</span><div className='lottieNav lottieFire' ref={setLottieRef(0)}><Lottie animationData={fireDrops} loop={true} style={{ width: 30 }} /></div></Link>
                    <a onClick={() => { openNav() }} className='navlink navhash' href="#vision"><span>Visión</span><div className='lottieNav' ref={setLottieRef(2)}><Lottie animationData={vision} loop={true} style={{ height: 50 }} /></div></a>
                </div>
                <div className='navbarStore'>
                    <Link to={'/store'} className='linkStore' >Tienda online<i className="fa-solid fa-cart-shopping navlinkIcon"></i></Link>
                </div>
            </nav>


        </>
    )
}

export default Nav