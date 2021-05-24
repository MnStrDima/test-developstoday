import Link from 'next/link';

const NavigationLink = ({ href, text }) => {
  return (
    <Link href={href}>
      <a>{text}</a>
    </Link>
  );
};

export default NavigationLink;
