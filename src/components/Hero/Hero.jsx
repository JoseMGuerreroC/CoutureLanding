import { useEffect, useState } from 'react';
import './Hero.css';

function Hero() {

    const [date, setDate] = useState();

    useEffect(() => {

        setDate(new Date(Date.now()).getFullYear());
        
        setTimeout(() => {
            function addImgScaleAnimation() {
                gsap.utils.toArray('.heroSection').forEach((section, index) => {
                    const image = document.querySelector(`#preview-${index + 1} img`);
    
                    const startCondition = index === 0 ? 'top top' : 'bottom bottom';
    
                    gsap.to(image, {
                        scrollTrigger: {
                            trigger: section,
                            start: startCondition,
                            end: () => {
                                const viewportHeight = window.innerHeight;
                                const sectionBottom = section.offsetTop + section.offsetHeight;
                                const additionalDistance = viewportHeight * 0.5;
                                const endValue = sectionBottom - viewportHeight + additionalDistance;
                                return `+=${endValue}`;
                            },
                            scrub: 1,
                        },
                        scale: 2,
                        ease: 'none',
                    });
                });
            }
    
            addImgScaleAnimation();
    
            function animateClipPath(
                sectionId,
                previewId,
                startClipPath,
                endClipPath,
                start = 'top center',
                end = 'bottom top'
            ) {
                let section = document.querySelector(sectionId);
                let preview = document.querySelector(previewId);
    
                ScrollTrigger.create({
                    trigger: section,
                    start: start,
                    end: end,
                    onEnter: () => {
                        gsap.to(preview, {
                            scrollTrigger: {
                                trigger: section,
                                start: start,
                                end: end,
                                scrub: 0.125,
                            },
                            clipPath: endClipPath,
                            ease: 'none',
                        });
                    },
                })
            }
    
            animateClipPath(
                '#section-1',
                '#preview-1',
                'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
            );
    
            const totalSections = 2;
    
            for(let i = 2; i <= totalSections; i++){
                let currentSection = `#section-${i}`;
                let prevPreview = `#preview-${i - 1}`;
                let currentPreview = `#preview-${i}`;
    
                animateClipPath(
                    currentSection,
                    prevPreview,
                    'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                    'top bottom',
                    'center center'
                );
    
                if(i <= totalSections){
                    animateClipPath(
                        currentSection,
                        currentPreview,
                        'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                        'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                        'center center',
                        'bottom top'
                    );
                }
            };
    
            gsap.to('.section-previews', {
                opacity: 0,
                zIndex: -1,
                duration: .5,
                scrollTrigger:{
                    trigger: '.headers',
                    start: '100% 100%',
                    end: '100% 100%',
                    toggleActions: 'play none reverse reverse',
                },
            })
        }, 1000)
    }, [])

    return (
        <div className="container">
            <div className="headers">
                <section className='heroSection' id='section-1'>
                    <p className='heroSectionTitle'>México</p>
                </section>
                <section className='heroSection' id='section-2'>
                    <p className='heroSectionTitle'>2024</p>
                </section>
                <div className="spacer"></div>
            </div>
            <div className="section-previews">
                <div className="img" id='preview-1'>
                    <img src="/img/hero/img-1.webp" alt="" />
                </div>
                <div className="img" id='preview-2'>
                    <img src="/img/hero/img-2.webp" alt="" />
                </div>
            </div>


        </div>
    )
}

export default Hero;