import Link from 'next/link';
import styles from './StyledLink.module.scss';

export type StyledLinkProps = {
  base: string;
  id: string;
  title: string;
}

const StyledLink = ({ base, id, title }: StyledLinkProps) => (
  <Link href={base + id} passHref>
    <a className={styles.root}>{title}</a>
  </Link>
);

export default StyledLink;
