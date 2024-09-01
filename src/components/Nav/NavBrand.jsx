import { useEffect, useRef } from "react";

function NavBrand() {

    useEffect(() => {

        let mm = gsap.matchMedia();

        mm.add("(min-width: 1201px)", () => {
            gsap.fromTo('.navbarBrand', {
                y: '-100%',
                opacity: 0,
            },{
                scrollTrigger: {
                    trigger: '.heroTitle',
                    start: '100% 0%',
                    end: '100% 0%',
                    toggleActions: 'play none reverse reverse',
                },
                y: 0,
                opacity: 1,
            })
          });
    }, [])

    const brandTl = useRef(gsap.timeline());

    function hoverBrand(){
        if(!brandTl.current.isActive()){
            brandTl.current.to('.brandText', {
                duration: 1,
                scrambleText: {
                    text: "ICÓNICO",
                    chars: "X",
                    speed: 0.2,
                }
            })
            .to('.brandText', {
                duration: 1,
                delay: .2,
                scrambleText: {
                    text: "AUTÉNTICO",
                    chars: "X",
                    speed: 0.2,
                }
            })
            .to('.brandText', {
                duration: 1,
                delay: .2,
                scrambleText: {
                    text: "SOFISTICADO",
                    chars: "X",
                    speed: 0.2,
                }
            })
            .to('.brandText', {
                duration: 1,
                delay: .4,
                scrambleText: {
                    text: "COUTURE",
                    chars: "X",
                    speed: 0.2,
                }
            })

        }
    }

    function clickBrand(){
        gsap.to(window, {duration: 1, scrollTo: 0})
    }

    return (
        <>
            <a href="#main" onMouseEnter={() => {hoverBrand()}} onClick={() => {clickBrand()}} className="navbarBrand">
                <p className="brandText coutureBrand">COUTURE</p>
            </a>
        </>
    )
}

export default NavBrand;