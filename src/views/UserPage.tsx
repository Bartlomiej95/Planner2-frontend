import Footer from "../organisms/Footer/Footer";
import Header from "../organisms/Header/Header";
import { MainSection } from "../organisms/MainSection/MainSection";
import { ProfileSection } from "../organisms/ProfileSection/ProfileSection";


export const UserPage = () => {
    return(
        <>
            <Header />
            <ProfileSection />
            <MainSection />
            <Footer />
        </>
    )
}
