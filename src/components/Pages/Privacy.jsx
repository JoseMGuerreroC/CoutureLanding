import CustomCursor from "../CustomCursor/CustomCursor";
import PrivacyText from "../PrivacyText/PrivacyText";
import GoUp from "../GoUp/GoUp";
import GeneralNav from '../GeneralNav/GeneralNav';
import { useEffect } from "react";

function Privacy() {

    useEffect(() => {
        gsap.to(window, {
            scrollTo: 0,
            duration: 0.5,
        })
    })

    return (
        <>
            <GeneralNav isBlack={false}></GeneralNav>
            <GoUp></GoUp>
            <CustomCursor></CustomCursor>
            <PrivacyText></PrivacyText>
        </>
    )
}

export default Privacy;