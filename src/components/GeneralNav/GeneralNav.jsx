import { useEffect } from 'react';
import './GeneralNav.css';
import { Link } from 'react-router-dom';

function GeneralNav({isBlack, hasBack = true}) {

    useEffect(( ) => {
        gsap.fromTo('.generalNav', {
            y: '-100%',
        },{
            duration: .5,
            y: 0,
            ease: 'power2.out'
        })
    }, [])

    return (
        <>
            <div className="generalNav" style={{background:(!hasBack ? 'transparent' : isBlack ? '#fff' : '#000')}}>
                <Link to={'/'} className='generalNavLink' style={{color:(isBlack ? '#000' : '#fff')}}><i className="fa-solid fa-house"></i><span>Inicio</span></Link>
                <p className='coutureBrand generalNavLogo' style={{color:(isBlack ? '#000' : '#fff')}}>COUTURE</p>
                <Link to={'/store'} className='generalNavLink' style={{color:(isBlack ? '#000' : '#fff')}}><i className="fa-solid fa-cart-shopping"></i><span>Tienda</span></Link>
            </div>
        </>
    )
}

export default GeneralNav;