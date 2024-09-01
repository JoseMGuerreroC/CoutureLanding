import { useEffect, useState } from 'react';
import './Gallery.css';

function Gallery() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch("/data/gallery.json")
            .then(response => response.json())
            .then(data => setImages(data))
            .catch(error => console.log(error));


    }, []);

    useEffect(() => {

        let mm = gsap.matchMedia();

        const galleryTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.galleryCont',
                start: 'top top',
                end: 'bottom bottom',
                pin: '.galleryPin',
                scrub: 1.5,
            },
        })

        gsap.timeline({
            scrollTrigger: {
                trigger: '.galleryCont',
                start: 'top top',
                end: 'top top',
                toggleActions: 'play none reverse reverse',
            },
            defaults: {
                ease: 'none'
            }
        }).to('.gallery1st', {
            scrambleText: {
                text: "Nos esforzamos por ofrecer una visión",
                chars: "Xx",
                speed: 0.5
            },
            duration: 1,
        }).to('.gallery2nd', {
            scrambleText: {
                text: " fresca y diferente,",
                chars: "Xx",
                speed: 0.4
            },
        }).to('.gallery3rd', {
            scrambleText: {
                text: "creando moda que no solo sigue las tendencias, sino que ",
                chars: "Xx",
                speed: 0.5,
                revealDelay: .5,
            },
            duration: 2,
        }).to('.gallery4th', {
            scrambleText: {
                text: " las establece.",
                chars: "Xx",
                speed: 0.3
            },
            duration: .5,
        }).to('.marks', {
            color: '#E69260',
            duration: .5,
            stagger: .2
        })

        mm.add('(max-width:1200px)', () => {
            galleryTl.to('.galleryScroller', {
                x: '-100%',
                xPercent: 5
            })
                .to('.galleryProgress', {
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                }, '<')

        });

        mm.add('(min-width:1201px)', () => {
            galleryTl.to('.galleryScroller', {
                x: '-100%',
                xPercent: 16.85,
            })
                .to('.galleryProgress', {
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                }, '<')
        });
    }, [])

    return (
        <>
            <div className="galleryCont" id='vision'>
                <div className="galleryPin" >
                    <div className="galleryScroller">
                        {images.map((image) => (
                            <div key={image.id} className='galleryImg'>
                                <img src={image.img} alt={image.title} />
                            </div>
                        ))}
                    </div>
                    <div className='galleryProgress'></div>
                    <p className='galleryVision'><span className='gallery1st'></span> <span className='gallery2nd marks'></span> <span className='gallery3rd'></span> <span className='gallery4th marks'></span> </p>
                </div>
            </div>
        </>
    );
}

export default Gallery;