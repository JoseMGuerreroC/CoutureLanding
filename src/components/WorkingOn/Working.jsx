import './Working.css';
import Lottie from 'lottie-react'
import working from '../../assets/animations/working.json';
import {Link} from 'react-router-dom';
import { useEffect } from 'react';

function Working() {

    useEffect(() => {
        gsap.to('.workingText', {
            scrambleText: {
                text: 'La tienda online de Couture se encuentra en proceso de desarrollo, atentos a nuestras redes sociales por cualquier aviso relacionado.',
                chars: "Xx",
                speed: 0.2,
            },
            duration: 2,
            delay: 1,
        });
    }, []);

    return (
        <>
            <div className='generalNav'>
                <Link to={'/'} className='generalNavLink workingLink' ><i className="fa-solid fa-house"></i>Inicio</Link>
            </div>
            
            <div className="workingCont">
            <p className='workingText'></p>
                <Lottie animationData={working} loop={true} style={{ width: 300, height: 300 }} />
            </div>
        </>
    )
}

export default Working;