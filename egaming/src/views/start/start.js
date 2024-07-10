import React from 'react';
import Hero from '../../components/start/hero/hero';
import Nav from '../../components/navbar/nav';
import './style.css';
import Info1 from '../../components/start/info-1/info-1';
import Member from '../../components/member/member';
import Discord from '../../components/start/discordInfo/discord';
import EgameNights from '../../components/start/egameNights/egameNights';
import EventList from '../../components/start/eventList/eventList';
import ThreeImages from '../../components/start/threeImages/ThreeImages';
import EtownAcademy from '../../components/start/etownacademy/EtownAcademy';

const StartPage = () => {

    const imgText = {
        firstH1: 'Bli en av oss',
        first: 'Hos oss kan du bli medlem, det kostar ingenting. Vi kommer i framtiden erbjuda flera förmåner för medlemmarna.',
        secondH1: 'Vi är en Sverok-förening',
        second: 'Distriktets syfte är att på olika sätt stötta och hjälpa sina medlemsföreningar samt främja spelhobbyn i regionen.',
        thirdH1: 'Följ oss på Instagram',
        third: 'På Instagram lägger vi upp bilder från tidigare event och information om kommande event. '
    }

    return (
        <>
            <Nav />
            <Hero />
            <Info1 />
            <EventList />
            <Member />
            <Discord />
            {/* <EtownAcademy
                namn1={"test"}
                namn2={"test"}
                namn3={"test"}
                namn4={"test"}
                namn5={"test"} />
            <EgameNights /> */}
            <ThreeImages
                first={'blue_etown_logo.png'}
                firstUrl={'/sverok-register'}
                firstText={imgText.first}
                firstH1={imgText.firstH1}
                second={'sverok.webp'}
                secondUrl={'https://malardalen.sverok.se/omsverokmalardalen/'}
                secondText={imgText.second}
                secondH1={imgText.secondH1}
                third={'igexample.webp'}
                thirdUrl={'https://www.instagram.com/etowngaming/'}
                thirdText={imgText.third}
                thirdH1={imgText.thirdH1}
            />
        </>
    );
};

export default StartPage;