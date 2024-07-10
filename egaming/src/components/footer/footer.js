import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { FaDiscord, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="event-sponsors">
                    <h1>SPONSORER</h1>
                    <div className="spons-three-col">
                        <img src={process.env.PUBLIC_URL + '/images/sparbanken.jpg'} alt="sparbanken" />
                        <img src={process.env.PUBLIC_URL + '/images/lfsodermanland.jpg'} alt="Länsförsäkrningar Södermanland" />
                        <img src={process.env.PUBLIC_URL + '/images/cherryxtrfy.png'} alt="xtrfy" />
                    </div>
                    <div className="spons-three-col">
                        <img src={process.env.PUBLIC_URL + '/images/stiga-logo.png'} alt="sverok" />
                        <img src={process.env.PUBLIC_URL + '/images/dreamhack-logo.png'} alt="sverok" />

                    </div>
                </div>

                <div className='bottom'>
                    <div className='footer-info'>
                        <h2>Om oss</h2>
                        <a href="/">Info</a>
                    </div>
                    <div className='footer-info'><h2>Sociala medier</h2>
                        <div className="socials">
                            <Link to="https://www.facebook.com/etowngaming"><FaFacebook size={30} /></Link>
                            <Link to="https://www.instagram.com/etowngaming/"><FaInstagram size={30} /></Link>
                            <Link to="https://discord.gg/2SvuEGEy3Q"><FaDiscord size={30} /></Link>
                        </div>
                    </div>
                    <div className='footer-info'>
                        <h2>Kontakt</h2>
                        <p>info@etowngaming.com</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;