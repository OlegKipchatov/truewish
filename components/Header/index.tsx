import dynamic from 'next/dynamic';
import Link from 'next/link';

import {
  Button, Navbar, NavbarBrand, NavbarContent, NavbarItem,
} from '@nextui-org/react';

import { UserAPI } from '@/entities/user';
import { createClient } from '@/shared/supabase/server';

import AuthButton from './AuthButton';
import { ThemeSwitcherLoading } from './ThemeSwitcher';

const ThemeSwitcher = dynamic(() => import('./ThemeSwitcher'), { ssr: false, loading: () => <ThemeSwitcherLoading /> });

export default async function Header() {
  const supabase = createClient();
  const isAuthenticated = await UserAPI.isAuthenticated(supabase);

  const linkProfile = isAuthenticated
    ? `/list/${(await UserAPI.getSessionUser(supabase))?.login}`
    : '/';

  return (
    <Navbar isBlurred>
      <NavbarBrand>
        <Link
          href={linkProfile}
          className="text-xl font-semibold text-foreground"
        >
          TrueWish
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>

        { isAuthenticated
          ? (
            <NavbarItem>
              <AuthButton linkProfile={linkProfile} />
            </NavbarItem>
          )
          : (
            <NavbarItem>
              <Button
                as={Link}
                variant="ghost"
                color="success"
                href="/login"
              >
                Login
              </Button>
            </NavbarItem>
          )}
      </NavbarContent>
    </Navbar>
  );
}
