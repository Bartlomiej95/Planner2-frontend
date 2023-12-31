import Banner from "../organisms/Banner/Banner";
import Header from "../organisms/Header/Header";
import PlannerFunc from "../organisms/PlannerFunc/PlannerFunc";
import FAQSection from "../organisms/FAQSection/FAQSection";
import JoinUsSection from "../organisms/JoinUsSection/JoinUsSection";
import Footer from "../organisms/Footer/Footer";

export const HomePage = () => {
    return(
        <>
            <Header/>
            <Banner/>
            <PlannerFunc />
            <FAQSection />
            <JoinUsSection />
            <Footer/>
        </>
    )
}