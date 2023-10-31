import Link from 'next/link';

export type StyledLinkProps = {
  base: string;
  id: string;
  title: string;
}

const StyledLink = ({ base, id, title }: StyledLinkProps) => (
  <Link href={base + id}>
    {title}
  </Link>
);

export default StyledLink;
