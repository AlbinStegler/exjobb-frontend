import React from "react";
import "./threeImages.css";

const ThreeImages = ({ first, firstUrl, firstText, firstH1, second, secondUrl, secondText, secondH1, third, thirdUrl, thirdText, thirdH1 }) => {
    const path = process.env.PUBLIC_URL + /images/;
    return (
        <div className="three-images">
            <div className="image-container one">
                <img src={path + first} alt
                    onClick={() => window
                        .open(firstUrl, "_self")} />
                <h1>{firstH1}</h1>
                <p>{firstText}</p>
                <button onClick={() => window.open(firstUrl, "_self")}>Läs mer</button>
            </div>
            <div className="image-container two">
                <img src={path + second} alt
                    onClick={() => window
                        .open(secondUrl, "_self")} />
                <h1>{secondH1}</h1>
                <p>{secondText}</p>
                <button onClick={() => window.open(secondUrl, "_self")}>Läs mer</button>
            </div>
            <div className="image-container three">
                <img src={path + third} alt
                    onClick={() => window
                        .open(thirdUrl, "_self")} />
                <h1>{thirdH1}</h1>
                <p>{thirdText}</p>
                <button onClick={() => window.open(thirdUrl, "_self")}>Läs mer</button>
            </div>
        </div>
    );
}

export default ThreeImages;