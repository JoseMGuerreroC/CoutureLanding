import { useEffect } from 'react';
import './GoToDrops.css'
import { Link } from 'react-router-dom'

function GoToDrops() {

    useEffect(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: '.gotoDropsTextCont',
                start: 'center 45%',
                endTrigger: '.gotoDropsCont',
                pin: true,
                end: 'bottom bottom',
                toggleActions: 'play none none reverse',
            },
            defaults: {
                ease: 'none',
            }
        })
            .to('.one .drops1st', {
                scrambleText: {
                    text: "Más que una tienda streetwear,",
                    chars: "Xx",
                    speed: 0.3
                },
                duration: .5,
            })
            .to('.one .drops2nd', {
                scrambleText: {
                    text: "un símbolo de",
                    chars: "Xx",
                    speed: 0.3,
                },
                duration: .9,
                delay: .3,
            })
            .to('.one .drops3rd', {
                scrambleText: {
                    text: "audacia y creatividad.",
                    chars: "Xx",
                    speed: 0.3
                },
                duration: .5,
            })
            .to('.gotoDropsText.two', {
                scrambleText: {
                    text: "Explora nuestros drops.",
                    chars: "Xx",
                    speed: 0.3,
                },
                duration: .5,
                delay: .5,
            })
            .to('.gotoDropsButton .buttonText', {
                scrambleText: {
                    text: "Ver drops",
                    chars: "Xx",
                    speed: 0.3,
                },
                duration: .5,
                delay: .2
            })
            .fromTo('.buttonLine', {
                width: '0px'
            }, {
                width: '100px',
                duration: .5,
                ease: 'power2.inOut',
            })
            .to('.three .drops1st', {
                scrambleText: {
                    text: "O continúa bajando y ",
                    chars: "Xx",
                    speed: 0.3,
                },
                duration: .3,
                delay: .3,
            })
            .to('.three .drops2nd', {
                scrambleText: {
                    text: "enamórate",
                    chars: "Xx",
                    speed: 0.3
                },
                duration: .3,
            })
            .to('.three .drops3rd', {
                scrambleText: {
                    text: "de Couture...",
                    chars: "Xx",
                    speed: 0.3
                },
                duration: .3,
            })
            .to('.one .drops3rd, .three .drops2nd', {
                color: '#E69260',
                duration: .5,
                stagger: .2
            })

    }, [])

    return (
        <>
            <div className="gotoDropsCont">
                <div className='gotoDropsTextCont'>
                    <p className='gotoDropsText one'><span className='drops1st'>&nbsp;</span> <span className='drops2nd'>&nbsp;</span> <span className='drops3rd'>&nbsp;</span></p>
                    <p className='gotoDropsText two'>&nbsp;</p>
                    <Link to={'/drops'} className='gotoDropsButton'><span className='buttonText'>&nbsp;</span><div className="buttonLine"></div></Link>
                    <p className='gotoDropsText three'><span className='drops1st'>&nbsp;</span> <span className='drops2nd'>&nbsp;</span> <span className='drops3rd'>&nbsp;</span></p>
                </div>
            </div>
        </>
    )
}

export default GoToDrops;