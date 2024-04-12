import React from 'react';
import Hero from '../../components/start/hero/hero';
import Nav from '../../components/navbar/nav';
import './style.css';
import Info1 from '../../components/start/info-1/info-1';
import Member from '../../components/member/member';
import Discord from '../../components/start/discordInfo/discord';
import EgameNights from '../../components/start/egameNights/egameNights';
const StartPage = () => {
    return (
        <>
            <Nav />
            <Hero />
            <Info1 />
            <Member />
            <Discord />
            <EgameNights />
        </>
    );
};

export default StartPage;