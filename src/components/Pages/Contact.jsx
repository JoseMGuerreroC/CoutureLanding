import ContactMain from "../Contact/ContactMain";
import CustomCursor from "../CustomCursor/CustomCursor";
import GeneralNav from '../GeneralNav/GeneralNav';


function Contact() {
    return (
        <>
            <GeneralNav isBlack={false} hasBack={false}></GeneralNav>
            <CustomCursor></CustomCursor>
            <ContactMain></ContactMain>
        </>
    )
}

export default Contact;