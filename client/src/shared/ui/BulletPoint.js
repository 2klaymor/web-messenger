import {useContext} from "react";
import {Link} from "react-router-dom";
import {images, ThemeContext} from "../../app/contexts/themeContext";

export default function BulletPoint({
                                            wrap, to,
                                            onClick,
                                            imageKey,
                                            userClassName,
                                            children,
                                        }) {
    const {theme} = useContext(ThemeContext);
    const src = images[theme][imageKey];

    const content = (
        <>
            <img className="bullet-point__img" src={src} alt={imageKey}/>
            <p>{children}</p>
        </>
    );

    if (wrap === "link") {
        return (
            <Link className={`bullet-point ${userClassName}`} to={to}>
                {content}
            </Link>
        )
    }
    if (wrap === "div") {
        return (
            <div className={`bullet-point ${userClassName}`} onClick={onClick}>
                {content}
            </div>
        )
    }
    // else {
    //     return (
    //         <li>
    //             <div className="bullet-point" onClick={onClick}>
    //                 {content}
    //             </div>
    //         </li>
    //     )
    // }
}