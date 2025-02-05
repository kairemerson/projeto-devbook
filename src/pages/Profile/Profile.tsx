import { useState } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { Container, ProfileMenu, ProfileMenuItem } from "./Profile.styles";
import { PersonalData } from "../../components/PersonalData";
import { Security } from "../../components/Security";

type ProfileTab = "personal-data" | "security"

export function Profile (){

    const [profileTab, setProfileTab] = useState<ProfileTab>("personal-data")

    const handleChangeProfileTab = (tab: ProfileTab) => setProfileTab(tab)
    return(
        <MainLayout>
            <div>perfil</div>
            <Container>
                <ProfileMenu>
                    <ul>
                        <ProfileMenuItem isActive={profileTab === "personal-data"} onClick={()=> handleChangeProfileTab("personal-data")}>Dados Pessoais</ProfileMenuItem>
                        <ProfileMenuItem isActive={profileTab === "security"} onClick={()=> handleChangeProfileTab("security")}>Segurança</ProfileMenuItem>
                    </ul>
                </ProfileMenu>
                {profileTab === "personal-data" && <PersonalData/>}
                {profileTab === "security" && <Security/>}
            </Container>

        </MainLayout>
    )
}