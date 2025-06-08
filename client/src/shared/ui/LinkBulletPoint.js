import {useContext} from "react";
import {Link} from "react-router-dom";
import {images, ThemeContext} from "../../app/providers/themeContext";

export default function LinkBulletPoint({to, imageKey, children}) {
    const {theme}= useContext(ThemeContext);
    console.log("LinkBulletPoint: theme =", theme, "; imageKey =", imageKey);
    console.log("LinkBulletPoint: images =", images);
    console.log("LinkBulletPoint: images[theme] =", images[theme]);

    return <li>
        <Link className="bullet-point" to={to}>
        <img className="bullet-point__img"
            src={images[theme][imageKey]}
             alt={imageKey}/>
            <p>{children}</p>
        </Link>
    </li>
}