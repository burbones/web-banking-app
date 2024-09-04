import linkedInLogo from '../img/linked_in.png';
import githubLogo from '../img/github.png';

export default function Footing() {
    return (
        <footer>
            <p>Created by Olga Liberzon</p>
            <a href="http://www.linkedin.com/in/liberzon-olga">
                <img src={linkedInLogo} alt="linkedin logo"/>
            </a>
            <a href="https://github.com/burbones">
                <img src={githubLogo} alt="gitlab logo" />
            </a>
        </footer>
    )
}