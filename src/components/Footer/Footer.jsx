import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {

    useEffect(() => {



        gsap.timeline({
            scrollTrigger: {
                trigger: '.footerCont',
                start: '10% 100%',
                end: '10% 100%',
                toggleActions: 'play none reverse reverse',
            },
            delay: 1,
        }).to('.footerLogoText', {
            scrambleText: {
                text: "COUTURE",
                chars: "Xx",
                speed: 0.01,
            },
            duration: 1,
        })
            .fromTo('.footerLogo i', {
                rotateX: '90deg',
                x: '-5px',
            }, {
                rotateX: '0deg',
                ease: "elastic.out(1,0.5)",
                duration: 1.5,
                x: '-5px',
            })
            .fromTo('.footerSocial, .footerLink', {
                opacity: 0,
                y: 100,
            }, {
                duration: .5,
                opacity: 1,
                y: 0,
                stagger: {
                    each: 0.1,
                    ease: 'power2.inOut'
                }
            }, '<')
    }, [])

    function openAcc(item) {
        if (item.classList.contains('activeAcc')) {
            item.classList.remove('activeAcc');
        } else {
            item.classList.add('activeAcc');
        }
    }


    return (
        <>
            <div className='footerCont'>
                <div className="footerLogo">
                    <p className='coutureBrand footerLogoText'>&nbsp;</p><i className="fa-solid fa-trademark"></i>
                </div>
                <div className="footerHolder">
                    <div className="footerSocial">
                        <div className='footerSocialIcons'>
                            <a href="https://instagram.com"><i className="fa-brands fa-instagram"></i></a>
                            <a href="https://tiktok.com"><i className="fa-brands fa-tiktok"></i></a>
                        </div>
                    </div>
                    <div className="footerLinks">
                        <Link to={'/contact'} className='footerLink'>Contacto</Link>
                        <Link to={'/privacy'} className='footerLink'>Política de privacidad</Link>
                    </div>
                </div>
                <div className="footerHolderMobile">
                    <div className="footerAccHolder">
                        <div className="footerAccItem" onClick={(e) => { openAcc(e.currentTarget) }}>
                            <p>Redes</p>
                            <div className="footerAccCont">
                                <a href="https://instagram.com"> Instagram</a>
                                <a href="https://tiktok.com">Tiktok</a>
                            </div>
                        </div>
                        <div className="footerAccItem" onClick={(e) => { openAcc(e.currentTarget) }}>
                            <p>Información</p>
                            <div className="footerAccCont">
                                <Link to={'/contact'}>Contacto</Link>
                                <Link to={'/privacy'}>Política de privacidad</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;