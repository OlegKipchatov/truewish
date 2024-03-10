import { Navbar, NavbarContent, NavbarBrand, NavbarItem } from '@nextui-org/navbar'
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ThemeSwitcherLoading } from './ThemeSwitcher';
import { createClient } from '@/utils/supabase/server';
import { UserAPI } from '@/entities/user';
import AuthButton from './AuthButton';

const ThemeSwitcher = dynamic(() => import('./ThemeSwitcher'), { ssr: false, loading: () => <ThemeSwitcherLoading /> });

export default async function Header() {
  const supabase = createClient();
  const isAuthenticated = await UserAPI.isAuthenticated(supabase);

  const linkProfile = isAuthenticated
    ? '/list/' + (await UserAPI.getSessionUser(supabase))?.login
    : '/';
  
  return (
    <Navbar isBlurred>
      <NavbarBrand>
        <Link
          href={linkProfile}
          className='text-xl font-semibold text-foreground'
        >
          TrueWish
        </Link>
      </NavbarBrand>
      <NavbarContent justify='end'>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>

        { isAuthenticated ?
          <NavbarItem>
            <AuthButton linkProfile={linkProfile} />
          </NavbarItem>
          : <>
            <NavbarItem>
              <Button as={Link} variant='ghost' color='success' href='/login'>Login</Button>
            </NavbarItem>
          </>
        }
      </NavbarContent>
    </Navbar>
  );
}
