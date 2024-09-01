import { useEffect, useRef, useState } from 'react';
import './DropChooser.css';
import { Link } from 'react-router-dom';

import Lottie from 'lottie-react'
import arrow from '../../assets/animations/arrow.json';
import GeneralNav from '../GeneralNav/GeneralNav';

function DropChooser() {

    const [drops, setDrops] = useState([]);
    const [dropLink, setDropLink] = useState();
    const dropSelects = useRef([]);
    const dropSelector = useRef(null);
    const [currentNav, setCurrentNav] = useState(0);
    const [totalNav, setTotalNav] = useState(null);
    const leftLottie = useRef(null);
    const rightLottie = useRef(null);

    useEffect(() => {

        fetch('/src/assets/data/drops.json')
    
            .then(response => response.json())
            .then(data => {
                setDrops(data.reverse());
                setDropLink(data[0].storeLink);
                if((data.length / 4) % 1 !== 0){
                    setTotalNav(Math.floor(data.length / 4))
                }else{
                    setTotalNav((data.length / 4) - 1)
                }
                

            })
            .catch(error => console.log(error));
    }, [])

    useEffect(() => {

        const cursor = document.querySelector('.cursor');
        const cursorIcon = cursor.querySelector('i');

        const dropLeft = document.querySelector('.dropLeft');
        const dropRight = document.querySelector('.dropRight');

        cursor.style.opacity = '0';

        let currentSlide = 1;
        const totalSlides = drops.length;

        const updateCursorClass = (position, hover) => {
            cursorIcon.classList.remove('fa-x', 'fa-arrow-right', 'fa-arrow-left');
            if (hover) {
                cursor.style.opacity = '1';
                if (position) {
                    cursorIcon.classList.add('fa-arrow-left');
                } else {
                    cursorIcon.classList.add('fa-arrow-right');
                }
            } else {
                cursor.style.opacity = '0';
            }
        }

        document.addEventListener('mousemove', e => {
            gsap.to(cursor, {
                x: e.clientX + 20,
                y: e.clientY - 30,
                duration: .5,
                ease: 'power3.out'
            })
        });

        const updateInfo = (slideNumber) => {
            const drop = drops[slideNumber - 1];
            if (drop) {
                gsap.to('.info .name', {
                    scrambleText: {
                        text: drop.name,
                        chars: "Xx",
                        speed: 0.01,
                    },
                    duration: .5,
                })

                gsap.to('.info .role', {
                    scrambleText: {
                        text: drop.release,
                        chars: "Xx",
                        speed: 0.01,
                    },
                    duration: .5,
                })

                setDropLink(drop.storeLink)
            }
        };

        const animateSlide = (slideNumber, reveal) => {
            const marquee = document.querySelector(`.t-${slideNumber}.marquee-wrapper`);
            const img = document.getElementById(`t-${slideNumber}`);
            const clipPathValue = reveal ? 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)' : 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)';

            gsap.to(marquee, {
                clipPath: clipPathValue,
                duration: 1,
                ease: 'power4.out',
                delay: 0.3
            });

            gsap.to(img, {
                clipPath: clipPathValue,
                duration: 1,
                ease: 'power4.out'
            })
        }

        updateInfo(currentSlide);

        const handleRightClick = () => {
            if (currentSlide < totalSlides) {
                animateSlide(currentSlide, false);
                currentSlide++;
                updateInfo(currentSlide);
            }
        }

        const handleLeftClick = () => {
            if (currentSlide > 1) {
                animateSlide(currentSlide - 1, true);
                currentSlide--;
                updateInfo(currentSlide);
            }
        }

        const handleSelect = (newSlide) => {

            if (newSlide > currentSlide) {
                for (let i = currentSlide; i < newSlide; i++) {
                    animateSlide(i, false);
                }
            } else if (newSlide < currentSlide) {
                for (let i = newSlide; i < currentSlide; i++) {
                    animateSlide(i, true);
                }
            }

            currentSlide = newSlide;
            updateInfo(newSlide);

        }

        dropLeft.addEventListener('click', () => {
            handleLeftClick();
        })

        dropLeft.addEventListener('mouseenter', () => {
            updateCursorClass(true, true)
        })

        dropLeft.addEventListener('mouseleave', () => {
            updateCursorClass(true, false)
        })

        dropRight.addEventListener('click', () => {
            handleRightClick();
        })

        dropRight.addEventListener('mouseenter', () => {
            updateCursorClass(false, true)
        })

        dropRight.addEventListener('mouseleave', () => {
            updateCursorClass(false, false)
        })

        for (const select of dropSelects.current) {
            select.addEventListener('click', (e) => {
                handleSelect(e.currentTarget.id)
            })
        }

    }, [drops]);

    function goNavLeft(){
        if(currentNav > 0){
            setCurrentNav(currentNav - 1)
            animateSelector(currentNav - 1);
        }
    }

    function goNavRight(){
        if(currentNav <= totalNav - 1){
             setCurrentNav(currentNav + 1)
             animateSelector(currentNav + 1);
         }
    }

    function animateSelector(page){
        gsap.to('.dropSelector', {
            x:`-${200 * page}px`,
            duration: 1,
            ease: 'elastic.out(.8,.8)'
        })
    }

    function playLottie(lottie){
        lottie.current.goToAndPlay(1, true);
    }

    return (
        <>
            <div className="dropChooser">
                <div className="dropSide dropLeft" style={{ zIndex: drops.length + 1 }}></div>
                <div className="dropSide dropRight" style={{ zIndex: drops.length + 1 }}></div>
                <GeneralNav isBlack={true}></GeneralNav>
                <div className="dropContainer">
                    <div className="overlay">
                        {drops.map((drop, index) => (
                            <div key={drop.id} style={{ zIndex: drop.id, background: '#fff' }} className={`t-${index + 1} marquee-wrapper`}>
                                <h1 className='marqueeTitle'>couture couture couture</h1>
                            </div>
                        ))}
                    </div>
                    <div className="modal" style={{ zIndex: drops.length + 1 }}>
                        <div className="modal-images">
                            {drops.map((drop, index) => (
                                <div key={drop.id} style={{ zIndex: drop.id }} id={`t-${index + 1}`} className='modal-img'>
                                    <img src={drop.img} alt={drop.name} />
                                </div>
                            ))}
                        </div>
                        <div className="info">
                            <div className="infoText">
                                <p className='name'>{drops[0]?.name}</p>
                                <p className='role'>{drops[0]?.release}</p>
                            </div>
                            <div className="infoLink">
                                <a href={dropLink}>Comprar</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dropSelectorNav">
                    <p className='dropNavTitle'>Más drops</p>
                    <Lottie animationData={arrow} onClick={() => {goNavLeft(); playLottie(leftLottie)}} lottieRef={leftLottie} autoplay={false} loop={false} style={{ width: 30 }}></Lottie>
                    <div className="dropSelectorCont" style={{ zIndex: drops.length + 1 }}>
                        <div className="dropSelector" ref={dropSelector}>
                            {drops.map((drop, index) => (
                                <div key={drop.id} id={index + 1} ref={(el) => dropSelects.current[index] = el} className="dropSelect">
                                    <img src={drop.backimgPreview} alt={drops.name} />
                                </div>
                            ))}

                        </div>
                    </div>
                    <Lottie onClick={() => {goNavRight(); playLottie(rightLottie)}} lottieRef={rightLottie} animationData={arrow} autoplay={false} loop={false} style={{ width: 30, transform: 'rotateY(180deg)' }}></Lottie>

                </div>

            </div>
            <div className="cursor">
                <i className="fa-solid fa-arrow-left"></i>
            </div>
        </>

    );
}

export default DropChooser;