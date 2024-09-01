import './PageNotFound.css';
import { Link } from 'react-router-dom';

import Lottie from 'lottie-react'
import anim404 from '../../assets/animations/404.json';
import { useEffect, useRef } from 'react';

function PageNotFound() {

    const lottie404 = useRef(null);
    const chars404 = useRef(null)

    useEffect(() => {

        const split404 = new SplitText(chars404.current, {type: 'chars'}); 

        gsap.timeline()
            .to('.text404 span', {
                duration: 1,
                scrambleText: {
                    text: "¿Qué haces aquí?",
                    chars: "Xx",
                    speed: 0.2,
                },
                delay: 1,
            })
            .fromTo('.anim404', {
                opacity: 0,
                y: '-100%'
            }, {
                opacity: 1,
                y: '0%',
                duration: .5,

            })
            .fromTo(split404.chars, {
                y: '100%',
                opacity: 0,
                rotate: '45deg'
            }, {
                duration: 1,
                y: '0%',
                opacity: 1,
                stagger: .4,
                rotate: '0deg'
            })
            .to('.subtitle404', {
                duration: .5,
                scrambleText: {
                    text: "Página no encontrada.",
                    chars: "Xx",
                    speed: 0.2,
                }
            })
            .to('.link404 span', {
                duration: .5,
                scrambleText: {
                    text: "Regresar a la página principal",
                    chars: "Xx",
                    speed: 0.2,
                }
            })
            .from('.link404Under', {
                width: '0%',
                duration: .5,
                ease: 'power2.inOut',
            })
    })

    return (
        <>
            <div className="page404Cont">
                <div className='text404'><span>&nbsp;</span><Lottie className='anim404' animationData={anim404} loop={true} style={{ width: 40 }} /></div>
                <h1 className='title404'><span ref={chars404}>404</span><div className='hide404'></div></h1>
                <h2 className='subtitle404'>&nbsp;</h2>
                <Link className='link404' to={'/'}><span>&nbsp;</span><div className='link404Under'></div></Link>
            </div>
        </>
    )
}

export default PageNotFound;

