import { Icon, Link } from "@chakra-ui/react";
import { FaDiscord, FaTwitter } from "react-icons/fa";

export const DiscordIcon = () => <Icon as={FaDiscord} boxSize={5} />;
export const TwitterIcon = () => <Icon as={FaTwitter} boxSize={5} />;

export const socialLinks = [
  {
    SocialIcon: DiscordIcon,
    label: "discord",
    href: "https://discord.com/invite/xkh9AEbgNH",
  },
  {
    SocialIcon: TwitterIcon,
    label: "twitter",
    href: "https://twitter.com/phunkyApeYC",
  },
];

type SocialLinkProps = {
  SocialIcon?: typeof Icon;
  href?: string;
  label?: string;
};

export const SocialLink = ({ SocialIcon, href, label }: SocialLinkProps) => (
  <Link p="0.5rem" display="inline-block" href={href} aria-label={label} isExternal>
    <Icon as={SocialIcon} />
  </Link>
);

export const SocialLinks = () => {
  return (
    <>
      {socialLinks.map((link) => {
        return <SocialLink key={link.href} {...link} />;
      })}
    </>
  );
};
