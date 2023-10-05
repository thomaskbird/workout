import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface NavItem {
  id: string;
  tgt: string;
  label: string;
  icon: IconProp;
}

const NavItems: NavItem[] = [
  {
    id: 'home',
    tgt: '/',
    label: 'Home',
    icon: 'home'
  },
  {
    id: 'work',
    tgt: '/work',
    label: 'Work',
    icon: 'book'
  },
  {
    id: 'services',
    tgt: '/services',
    label: 'Services',
    icon: 'briefcase'
  },
  {
    id: 'blog',
    tgt: '/blog',
    label: 'Blog',
    icon: 'book'
  },
  {
    id: 'resume',
    tgt: '/resume',
    label: 'Resume',
    icon: 'file-pdf'
  },
  {
    id: 'contact',
    tgt: '/contact',
    label: 'Contact',
    icon: 'envelope'
  }
]

export { NavItems }
