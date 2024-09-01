import { Link } from 'react-router-dom';
import "./GoToStore.css"
import { useEffect } from 'react';

function GoToStore() {

    useEffect(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: '.gotoStoreCont',
                start: '0% 90%',
                end: '0% 90%',
                toggleActions: 'play none reverse reverse',
            }
        })
            .fromTo('.marqueeLink', {
                x: '-100%',
            }, {
                x: '0%',
                delay: .5,
                duration: .5,
                ease: "elastic.out(.2,1)",
            })
            .fromTo('.marqueeWords', {
                opacity: 0
            }, {
                opacity: 1,
                duration: .5,
                ease: 'power2.inOut'
            })
    })

    return (
        <>
            <div className="gotoStoreCont">
                <div className="marqueeCont">
                    <Link to={'/store'} className="marquee marqueeLink">
                        <span>&nbsp;Visita nuestra tienda online -</span>
                        <span>&nbsp;Visita nuestra tienda online -</span>
                    </Link>
                    <div className="marquee marqueeWords">
                        <span className='words'>
                            &nbsp;Comfort. Moda. Calidad. Comfort. Moda. Calidad. Comfort. Moda. Calidad. Comfort. Moda. Calidad. Comfort. Moda. Calidad. Comfort. Moda. Calidad. Comfort. Moda. Calidad. Comfort. Moda. Calidad. Comfort. Moda. Calidad. Comfort. Moda. Calidad. Comfort. Moda. Calidad. Comfort. Moda. Calidad.
                        </span>
                        <span className='words'>
                            &nbsp;Comfort. Moda. Calidad. Comfort. Moda. Calidad. Comfort. Moda. Calidad. Comfort. Moda. Calidad. Comfort. Moda. Calidad. Comfort. Moda. Calidad. Comfort. Moda. Calidad. Comfort. Moda. Calidad. Comfort. Moda. Calidad. Comfort. Moda. Calidad. Comfort. Moda. Calidad. Comfort. Moda. Calidad.
                        </span>
                    </div>
                </div>

            </div>
        </>
    )
}

export default GoToStore;