import successAnimation from '../assets/animations/SuccessAnimation.json';
import ArrowLeft from '../assets/images/arrow-left.svg';
import EmailIcon from '../assets/images/email-icon.svg';
import FacebookIcon from '../assets/images/facebook.svg';
import ForgotHero from '../assets/images/forgot-hero.svg';
import GoogleIcon from '../assets/images/google.svg'; // png is already supported by Expo
import KeyIcon from '../assets/images/key.png';
import LetterIcon from '../assets/images/Letter.svg';
import LoginHero from '../assets/images/login-hero.svg';
import RegisterHero from '../assets/images/register-hero.svg';
import ResetHero from '../assets/images/reset-hero.svg';
import UserIcon from '../assets/images/User.svg';
import AppleCompany from '../assets/images/apple-company.png';

const icons = {
  user: UserIcon,
  email: LetterIcon,
  password: KeyIcon,
  confirmPassword: KeyIcon,
  facebook: FacebookIcon,
  google: GoogleIcon,
  login: LoginHero,
  register: RegisterHero,
  forgot: ForgotHero,
  success: successAnimation,
  emailIcon: EmailIcon,
  back: ArrowLeft,
  reset: ResetHero,
  apple: AppleCompany,
};
export default icons;
