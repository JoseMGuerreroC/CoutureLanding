import { useEffect } from 'react';
import './GoUp.css'

function GoUp(){

    useEffect(() => {
        setTimeout(() => {
            gsap.fromTo('.goUpCont', {
                scale: 0,
            }, {
                scale: 1,
                duration: .5,
                ease: "elastic.out(1,0.5)",
                scrollTrigger: {
                    trigger: 'body',
                    start: () => `top+=${window.innerHeight * 1} 100%`,
                    end: () => `top+=${window.innerHeight * 1} 100%`,
                    toggleActions: 'play none reverse none'
                }
            })
        }, 1000)
    },[])

    function goToBody(){
        gsap.to(window, { duration: 1, scrollTo: 0 });
    }

    return(
        <>
            <div onClick={goToBody} className="goUpCont">
                <i className="fa-solid fa-chevron-up"></i>
            </div>
        </>
    )
}

export default GoUp;