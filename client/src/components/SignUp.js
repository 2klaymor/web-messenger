import {Link} from 'react-router-dom';


const SignUp = () => {
    return (
        <div className="d-flex flex-row">

            {/* row element 1 */}
            <img className="logo-signup" src="/logo-white-blur-stretched.jpg" alt="logo"/>

            {/* row element 2 */}
            <div className="m-auto">
                {/* column element 1 */}
                <h1>sign up to deadin.site</h1>
                {/* column element 2 */}
                <div className="form-signup">

                    <label htmlFor="inputUsername" className="form-label">username</label>
                    <input className="form-control" id="inputUsername" type="text"/>

                    <label htmlFor="inputEmail" className="form-label">email</label>
                    <input className="form-control" id="inputEmail" type="email" placeholder="example@example.com"/>

                    <label htmlFor="inputPassword" className="form-label">password</label>
                    <input className="form-control" id="inputPassword" type="password"/>

                    <button className="btn" type="submit">continue</button>

                    <p>
                        already have an account?&nbsp;
                        <Link to="/signin">sign in</Link>
                    </p>

                </div>
            </div>

        </div>

    );
}

export default SignUp;