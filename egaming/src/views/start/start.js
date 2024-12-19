import React from 'react';
import Hero from '../../components/start/hero/hero';
import Nav from '../../components/navbar/nav';
import './style.css';
import Info1 from '../../components/start/info-1/info-1';
import Member from '../../components/start/member/member';
import Discord from '../../components/start/discordInfo/discord';
import EventList from '../../components/start/eventList/eventList';
import ThreeImages from '../../components/start/threeImages/ThreeImages';
// import EgameNights from '../../components/start/egameNights/egameNights';
// import EtownAcademy from '../../components/start/etownacademy/EtownAcademy';

const StartPage = () => {

    const imgText = {
        firstH1: 'Bli en av oss',
        first: 'Hos oss kan du bli medlem, det kostar ingenting. Vi kommer i framtiden erbjuda flera förmåner för medlemmarna.',
        secondH1: 'Vi är en Sverok-förening',
        second: 'Distriktets syfte är att på olika sätt stötta och hjälpa sina medlemsföreningar samt främja spelhobbyn i regionen.',
        thirdH1: 'Följ oss på Instagram',
        third: 'På Instagram lägger vi upp bilder från tidigare event och information om kommande event. '
    }

    const infoVal = {
        img: 'blue_etown_logo.png',
        smallHeader: 'En förening för spelintresserade!',
        header: 'Om oss',
        text: 'Vi jobbar för begreppet "E-sport för alla",  e-sport där alla människor ska kunna delta, utvecklas och känna sig trygga. Vi arrangerar event, tävlingar, studiecirklar och andra aktiviteter för att främja e-sport och gamingkultur.',
        buttonText: 'Kommande Händelser',
        buttonLink: '/events',
    }

    const info2Val = {
        header: 'Bli en E-Town Gamer',
        img: 'je.png',
        p1: 'Föreningen lyssnar alltid till sina medlemmar och genomför event som NI medlemmar efterfrågar, därför är det viktigt att bli medlem om du vill delta i utvecklingen av Eskilstunas e-sport och gamingkultur.',
        p2: 'Att vara medlem kostar inget och kommer att innebära att du har möjlighet att delta på våra kommande event samt påverka vad vi ska genomföra i framtiden.',
        buttonText: 'Bli Medlem',
        buttonLink: 'https://ebas.sverok.se/blimedlem/etowngaming',
    }

    return (
        <>
            <Nav />
            <Hero
                backgroundUrl={"first_export_long.webm"}
                contentUrl={"Banner.png"}
                contentText={"Eskilstunas största e-sportförening"}
            />
            <Info1
                img={infoVal.img}
                smallHeader={infoVal.smallHeader}
                header={infoVal.header}
                text={infoVal.text}
                buttonText={infoVal.buttonText}
                buttonLink={infoVal.buttonLink}
                socials={true}
            />
            <EventList />
            <Member
                p1={info2Val.p1}
                p2={info2Val.p2}
                img={info2Val.img}
                header={info2Val.header}
                buttonText={info2Val.buttonText}
                buttonLink={info2Val.buttonLink}
            />
            <Discord />
            {/* <EtownAcademy
                namn1={"test"}
                namn2={"test"}
                namn3={"test"}
                namn4={"test"}
                namn5={"test"} />
            <EgameNights /> */}
            <ThreeImages
                first={'favicon.png'}
                // firstUrl={'/sverok-register'}
                firstUrl={'https://ebas.sverok.se/blimedlem/etowngaming'}
                firstText={imgText.first}
                firstH1={imgText.firstH1}
                second={'sverok-purple.png'}
                secondUrl={'https://malardalen.sverok.se/omsverokmalardalen/'}
                secondText={imgText.second}
                secondH1={imgText.secondH1}
                third={'igexample.png'}
                thirdUrl={'https://www.instagram.com/etowngaming/'}
                thirdText={imgText.third}
                thirdH1={imgText.thirdH1}
            />
        </>
    );
};

export default StartPage;