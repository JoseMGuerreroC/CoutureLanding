import { useEffect, useRef, useState } from 'react';
import './Contact.css'
import emailjs from '@emailjs/browser';
import Lottie from 'lottie-react'
import lottieLoad from '../../assets/animations/loading.json';
import lottieError from '../../assets/animations/error.json';
import lottieSuccess from '../../assets/animations/success.json';


function ContactMain() {

    const formHolder = useRef(null)
    const [actualSection, setactualSection] = useState(0);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');
    const verifiedSections = useRef([
        { verified: false },
        { verified: false },
        { verified: false },
        { verified: true }
    ]);

    const typingTimeoutRef = useRef(null);

    const successDialogPhrases = useRef([
        ['Ese es un nombre con mucha personalidad.', 'Un nombre peculiar.', 'Tu nombre es realmente único.', 'Que gusto ver un nombre tan distinguido.', 'Un nombre fuerte y memorable', 'Que nombre tan original.', 'Un nombre elegante, como nuestra marca.'],
        ['Por favor, ingresa un correo válido. Algo como esto: alguien@example.com', '¡Es un correo válido!'],
        ['Gracias por compartir tus pensamientos.', 'Apreciamos que te tomes el tiempo para escribirnos', 'Es genial escuchar lo que tienes que decir', 'Tu mensaje es importante y será tomado en cuenta.', 'Cada palabra cuenta, y apreciamos la tuya.', 'Gracias por tomarte el tiempo para escribirnos.'],
    ]);

    const emptyDialogPhrases = useRef([
        ['Necesitas ingresar tu nombre para continuar.', 'Necesitamos un nombre para entablar una conversación.', '¿No te llamas así? Lo entendemos, pero necesitamos un nombre.'],
        ['Necesitas ingresar tu correo para continuar.', '¿Te equivocaste de correo? Ingresa uno para continuar.', 'Vale, que ese correo era el incorrecto.'],
        ['Necesitas ingresar tu mensaje para continuar.', 'Te damos más tiempo para pensarlo.', 'Necesitamos un mensaje para el mensaje... ¿verdad?'],
    ]);

    const contactForm = useRef(null);
    const formTimeline = useRef(null);

    const [lottieLoading, setLottieLoading] = useState(lottieLoad);
    const [formExit, setFormExit] = useState(false);
    const [formResend, setFormResend] = useState(false);

    useEffect(() => {
        formTimeline.current = gsap.timeline({ paused: true })
            .fromTo(contactForm.current, {
                clipPath: 'polygon(0 0, 0 0, 0 10%, 0 10%)',
            }, {
                clipPath: 'polygon(0 0, 100% 0, 100% 10%, 0 10%)',
                duration: .5,
                ease: 'power2.in'
            }).to(contactForm.current, {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                duration: .5,
                delay: .3
            });
    }, []);

    function openForm() {
        formTimeline.current.play();
    };

    function closeForm() {
        formTimeline.current.reverse();
    };

    function relocateSection(direction, section) {
        if (verifiedSections.current[section].verified !== false) {
            if (direction) {
                if (actualSection < 3) {
                    setactualSection(actualSection + 1);
                    moveSection(actualSection + 1);
                }
            }
        }
        if (!direction) {
            if (actualSection > 0) {
                setactualSection(actualSection - 1);
                moveSection(actualSection - 1);
            }
        }
    };

    function moveSection(section) {
        gsap.to(formHolder.current, {
            y: `-${100 * section}svh`,
            duration: .5,
            ease: 'power2.inOut',
        });
    };

    function verifySection(input) {
        let dialogue;
        const inputID = input.id;
        if (input.value !== '') {
            if (inputID == 1) {
                const isEmailValid = validateEmail(input.value);
                if (isEmailValid) {
                    dialogue = selectDialogue(1, successDialogPhrases.current, isEmailValid);
                    verifiedSections.current[inputID].verified = isEmailValid;
                } else {
                    dialogue = selectDialogue(1, successDialogPhrases.current, isEmailValid);
                    verifiedSections.current[inputID].verified = isEmailValid;
                }
            } else {
                dialogue = selectDialogue(inputID, successDialogPhrases.current);
                verifiedSections.current[inputID].verified = true;
            }
        } else {
            verifiedSections.current[inputID].verified = false;
            dialogue = selectDialogue(inputID, emptyDialogPhrases.current);
        }
        handleDialog(inputID, dialogue);
    };

    function handleDialog(id, dialogueText) {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            const dialogueCont = document.querySelector(`.nameDialog[id="${id}"]`);
            gsap.to(dialogueCont, {
                scrambleText: {
                    text: dialogueText,
                    chars: "Xx",
                    speed: 0.3
                },
                duration: .5,
            })
        }, 1000);
    };

    function selectDialogue(id, dialogues, isValid) {
        let dialogue;
        if (id !== 1) {
            const random = Math.floor(Math.random() * (dialogues[id].length));
            dialogue = dialogues[id][random];
        } else {
            isValid ? dialogue = dialogues[id][1] : dialogue = dialogues[id][0];
        }
        return dialogue;
    };

    function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    function clickSendForm() {
        gsap.timeline()
            .to('.contactLoading', {
                zIndex: 3010,
                duration: .05,
                display: 'flex',
            })
            .fromTo('.contactLoading', {
                backdropFilter: 'blur(0px)',
            }, {
                backdropFilter: 'blur(5px)',
                duration: .5,
                ease: 'power2.in',
            })

        sendForm();
    };

    function sendForm() {
        const templateParams = {
            user_name: userName,
            user_email: email,
            message: msg,
        }

        emailjs
            .send(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, templateParams, {
                publicKey: import.meta.env.VITE_PUBLIC_KEY,
            }) 
            .then(

                () => {
                    setFormExit(true);
                    setLottieLoading(lottieSuccess);
                    setLoadingDialogue('Se ha enviado tu mensaje correctamente, te contactaremos lo más pronto por la dirección de correo que nos diste.');
                },
                (error) => {
                    setFormExit(true);
                    setFormResend(true);
                    setLottieLoading(lottieError);
                    setLoadingDialogue('Ha ocurrido un error al enviar tu mensaje, reinténtalo o inténtalo más tarde.');
                },
            )
    };

    function exitForm() {
        setFormExit(false);
        setFormResend(false);
        setLoadingDialogue('Cerrando formulario...');
        setLottieLoading(lottieLoad);
        setUserName('');
        setEmail('');
        setMsg('');
        gsap.timeline()
            .to('.contactLoading', {
                background: '#000',
                onComplete: () => {
                    moveSection(0);
                    setactualSection(0);
                    closeForm();
                },
                duration: 2,
            })
            .to('.contactLoading', {
                background: 'transparent',
                duration: .5,
                delay: 1.3
            })
            .fromTo('.contactLoading', {
                backdropFilter: 'blur(5px)',
            }, {
                backdropFilter: 'blur(0px)',
                duration: 1,
                ease: 'power2.in',
            })
            .to('.contactLoading', {
                zIndex: -1,
                duration: .05,
                display: 'none',
                onComplete: () => {
                    setLoadingDialogue('');
                    document.querySelector('.controlsNext').classList.remove('active')
                    for (const p of document.querySelectorAll('.nameDialog')) {
                        p.textContent = '';
                    }
                    for (const input of document.querySelectorAll('.inputForm')) {
                        input.value = '';
                    }
                    for (let i = 0; i < 3; i++) {
                        verifiedSections.current[i].verified = false;
                    }
                }
            })
    };

    function resendForm() {
        setFormExit(false);
        setFormResend(false);
        setLottieLoading(lottieLoad)
        setLoadingDialogue('Reintentando...')
        setTimeout(() => {
            sendForm();
        }, 2000)
    };

    function setLoadingDialogue(dialogue) {
        gsap.to('.loadingDialogue', {
            scrambleText: {
                text: dialogue,
                chars: "Xx",
                speed: .5,
            },
            duration: .5,
        })
    }



    return (
        <>
            <div className='contactLoading'>
                <Lottie className='loadingLottie' animationData={lottieLoading} autoplay={true} loop={true} style={{ width: 80, height: 80}}></Lottie>
                <p className='loadingDialogue'></p>
                <div className='loadingBtnCont'>
                    {formExit ? (
                        <>
                            <button onClick={exitForm}>Salir</button>
                        </>
                    ) : (
                        <></>
                    )}
                    {formResend ? (
                        <>
                            <button onClick={resendForm}>Reintentar</button>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <div className="contactMain">
                <video src="/src/assets/img/Contact/contactVid.mp4" autoPlay loop muted></video>
                <div className="contactMarqueeCont">
                    <div className="marquee marqueeContact">
                        <span>&nbsp;Mándanos un mensaje -</span>
                        <span>&nbsp;Mándanos un mensaje -</span>
                    </div>
                </div>
                <div className='contactInfoCont'>
                    <div className="contactInfo">
                        <p>¿Tienes preguntas, ideas o simplemente quieres hablar de estilo? Usa el formulario para conectarte con el equipo de Couture y llevar tu experiencia al siguiente nivel.</p>
                        <a className='formLink' onClick={() => { openForm() }}>Ir al formulario<div></div></a>
                    </div>
                    <div className="contactSocial">
                        <p>Síguenos en redes</p>
                        <div className="socialHolder">
                            <a href="https://instagram.com"><i className="fa-brands fa-instagram"></i></a>
                            <a href="https://tiktok.com"><i className="fa-brands fa-tiktok"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={contactForm} className="contactForm">
                <div ref={formHolder} className="formHolder">
                    <div className="formSection">
                        <div className='sectionIns'>
                            <p>Antes de que empecemos,</p>
                            <p>¿Cuál es tu nombre?</p>
                        </div>
                        <div className='inputSelect'>
                            <input id='0' className='inputForm inputName' maxLength={50} type="text" placeholder='Nombre y apellido' onChange={(e) => { setUserName(e.currentTarget.value); verifySection(e.currentTarget) }} />
                            <div className='inputSelectLine'></div>
                        </div>
                        <p id='0' className='nameDialog'></p>
                    </div>
                    <div className="formSection">
                        <div className='sectionIns'>
                            <p>Gusto en conocerte {userName},</p>
                            <p>¿Cuál es tu correo electrónico?</p>
                        </div>
                        <div className='inputSelect'>
                            <input id='1' className='inputForm inputEmail' type="text" maxLength={50} placeholder='Ingresa tu correo electrónico' onChange={(e) => { setEmail(e.currentTarget.value); verifySection(e.currentTarget) }} />
                            <div className='inputSelectLine'></div>
                        </div>
                        <p id='1' className='nameDialog'></p>
                    </div>
                    <div className="formSection">
                        <div className='sectionIns'>
                            <p>Muy bien. Por último,</p>
                            <p>¿Qué es lo que quieres decirnos?</p>
                        </div>
                        <div className='inputSelect'>
                            <textarea id='2' className='inputForm inputMsg' placeholder='Cuéntanos (Máx 250 caractéres)' maxLength={250} onChange={(e) => { setMsg(e.currentTarget.value); verifySection(e.currentTarget) }}></textarea>
                            <div className='inputSelectLine'></div>
                        </div>
                        <p id='2' className='nameDialog'></p>
                    </div>
                    <div className="formSection">
                        <div className='sectionIns'>
                            <p>Hemos terminado.</p>
                            <p>Verifica que todo este correcto:</p>
                        </div>
                        <div className="sectionPreview">
                            <div className='previewRow'>
                                <h2>Nombre:</h2>
                                <span>{userName}</span>
                                <button onClick={() => { moveSection(0); setactualSection(0) }}><i className="fa-solid fa-pen-to-square"></i></button>
                            </div>
                            <div className='previewRow'>
                                <h2>Correo:</h2>
                                <span>{email}</span>
                                <button onClick={() => { moveSection(1); setactualSection(1) }}><i className="fa-solid fa-pen-to-square"></i></button>
                            </div>
                            <div className='previewRow'>
                                <h2 className='.msgTitle'>Mensaje:</h2>
                                <span className='msgholder'>{msg}</span>
                                <button onClick={() => { moveSection(2); setactualSection(2) }}><i className="fa-solid fa-pen-to-square"></i></button>
                            </div>
                            {(userName !== '' && msg !== '' && validateEmail(email)) ? (
                                <button className='sendForm' onClick={clickSendForm}>Enviar</button>
                            ) : (
                                <p className='sendEmpty'>Modificaste el Translate? Inteligente, pero no funcionará.</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="formControls">
                    <button onClick={() => { closeForm() }}>Salir del formulario</button>
                    <div className="formControlsHolder">
                        <button className={`controlsBack ${actualSection == 0 ? 'disabled' : ''}`} onClick={() => { relocateSection(false, actualSection) }}><i className="fa-solid fa-chevron-left"></i><span>Retroceder</span></button>
                        <button className={`controlsNext ${actualSection == 3 ? 'disabled' : ''} ${verifiedSections.current[actualSection].verified == true ? 'active' : 'disabled'}`} onClick={() => { relocateSection(true, actualSection) }}><span>Continuar</span><i className="fa-solid fa-chevron-right"></i></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactMain;