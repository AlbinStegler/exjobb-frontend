import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { FaDiscord, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <>
            <div className="footer">
                <h1>SPONSORER</h1>
                <div className='top'>
                    <img src="images/lfsodermanland.jpg" alt="lfsodermanland" />
                    <img src="images/sparbanken.jpg" alt="sparbanken" />
                    <img src="images/xtrfy.png" alt="xtrfy" />
                </div>
                <div className='bottom'>
                    <div className='footer-info'>
                        <h2>Kontakt</h2>
                        <p>info@etowngaming.com</p>
                    </div>
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
                </div>
            </div>
        </>
    );
};

export default Footer;