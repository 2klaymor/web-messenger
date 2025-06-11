import {useContext} from "react";
import {Link} from "react-router-dom";
import {images, ThemeContext} from "../../app/utils/themeContext";


export default function BulletPoint({
                                            wrap, to,
                                            onClick,
                                            imageKey,
                                            children
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
            <li>
                <Link className="bullet-point" to={to}>
                    {content}
                </Link>
            </li>
        )
    } else {
        return (
            <li>
                <div className="bullet-point" onClick={onClick}>
                    {content}
                </div>
            </li>
        )
    }
}