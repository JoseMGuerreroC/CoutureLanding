import { useEffect } from 'react';
import { scrollToHash } from '../ScrollToHash/ScrollToHash';
import './RevealPage.css'

function RevealPage() {

    function showBrand() {
        setTimeout(() => {
            const typed = new Typed('.auto-type', {
                strings: ['COUTURE'],
                typeSpeed: 150,
                backSpeed: 0,
                loop: false,
            })
            gsap.to('.typed-cursor', {
                display: 'none',
                delay: 2
            })
        }, 800)
    }

    useEffect(() => {
        let mm = gsap.matchMedia();

        showBrand();

        mm.add('(min-width:1201px)', () => {
            gsap.timeline({ delay: 3.2 })
                .fromTo('.revealClip', {
                    scale: 1.2,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                }, {
                    scale: 1,
                    duration: 1,
                    clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
                    stagger: {
                        each: 0.15,
                        ease: 'power.inOut'
                    }
                }, '<')
                .fromTo('.revealAnimationCont', {
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                }, {
                    duration: .1,
                    clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
                })
                .fromTo('.heroTitle', {
                    scale: .7,
                    transform: 'scaleX(1.1)',
                }, {
                    transform: 'scaleX(1.1)',
                    scale: 1,
                    duration: 1,
                }, '<')
                .fromTo('.navbar', {
                    y: '-100%',
                }, {
                    ease: "elastic.out(1,0.5)",
                    duration: .3,
                    y: 0,
                    zIndex: 1500,
                    onComplete: (e) => {
                        gsap.to('body', {
                            overflowY: 'auto',
                        })
                    }
                })
        });

        mm.add('(max-width:1200px)', () => {
            gsap.timeline({ delay: 3.2 })
                .fromTo('.revealClip', {
                    scale: 1.2,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                }, {
                    scale: 1,
                    duration: 1,
                    clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
                    stagger: {
                        each: 0.15,
                        ease: 'power.inOut'
                    }
                }, '<')
                .fromTo('.revealAnimationCont', {
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                }, {
                    duration: .1,
                    clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
                })
                .fromTo('.heroTitle', {
                    scale: .7,
                    transform: 'scaleX(1.1)',
                }, {
                    transform: 'scaleX(1.1)',
                    scale: 1,
                    duration: 1,
                    
                }, '<')
                .fromTo('.navbarBtn', {
                    y: '-200%',
                    opacity: 0,
                }, {
                    y: 0,
                    opacity: 1,
                    zIndex: 2001,
                    onComplete: (e) => {
                        gsap.to('body', {
                            overflowY: 'auto',
                        })
                    }
                })
        });
    }, []);

    return (
        <>
            <div className='revealCont'>
                <h1 className='coutureBrand heroTitle'><span className='auto-type'></span></h1>
                <div className='revealAnimationCont'>
                    <section className='revealImgCont'>
                        <div className="revealClip revealBlack"></div>
                        <img className='revealClip revealImg' src="/img/Reveal/revImg-1.webp" alt="" />
                        <img className='revealClip revealImg' src="/img/Reveal/revImg-2.webp" alt="" />
                        <img className='revealClip revealImg' src="/img/Reveal/revImg-3.webp" alt="" />
                        <img className='revealClip revealImg' src="/img/Reveal/revImg-4.webp" alt="" />
                        <img className='revealClip revealImg' src="/img/Reveal/revImg-5.webp" alt="" />
                        <img className='revealClip revealImg' src="/img/Reveal/revImg-6.webp" alt="" />
                        <img className='revealClip revealImg' src="/img/Reveal/revImg-7.webp" alt="" />
                    </section>
                </div>
            </div>

        </>
    )
}

export default RevealPage;