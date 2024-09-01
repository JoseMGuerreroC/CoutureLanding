export function scrollToHash(hash, e) {
    const elem = hash ? document.querySelector(hash) : false;
    if (elem) {
        if(e) e.preventDefault();
        gsap.to(window, { 
            scrollTo: { y: elem, offsetY: -10}, 
            duration: 1,
            onStart: () => {
                history.pushState(null, "", hash); 
            }
        });
    }
}