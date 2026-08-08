import React from 'react';
import facebookImg from '../../resources/assets/social/facebook.svg';
import githubImg from '../../resources/assets/social/github.png';
import googleImg from '../../resources/assets/social/google.png';
import linkedinImg from '../../resources/assets/social/linkedIn.svg';
import telegramImg from '../../resources/assets/social/telegram.png';
import whatsappImg from '../../resources/assets/social/whatsapp.png';

export interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number | string;
}

export const GithubIcon = ({ size = 24, className, ...props }: IconProps) => (
  <img src={githubImg} width={size} height={size} alt="GitHub" className={`object-contain ${className || ''}`} {...props} />
);

export const LinkedinIcon = ({ size = 24, className, ...props }: IconProps) => (
  <img src={linkedinImg} width={size} height={size} alt="LinkedIn" className={`object-contain ${className || ''}`} {...props} />
);

export const FacebookIcon = ({ size = 24, className, ...props }: IconProps) => (
  <img src={facebookImg} width={size} height={size} alt="Facebook" className={`object-contain ${className || ''}`} {...props} />
);

export const WhatsAppIcon = ({ size = 24, className, ...props }: IconProps) => (
  <img src={whatsappImg} width={size} height={size} alt="WhatsApp" className={`object-contain ${className || ''}`} {...props} />
);

export const TelegramIcon = ({ size = 24, className, ...props }: IconProps) => (
  <img src={telegramImg} width={size} height={size} alt="Telegram" className={`object-contain ${className || ''}`} {...props} />
);

export const GmailIcon = ({ size = 24, className, ...props }: IconProps) => (
  <img src={googleImg} width={size} height={size} alt="Google/Email" className={`object-contain ${className || ''}`} {...props} />
);
