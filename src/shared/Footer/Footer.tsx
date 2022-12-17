import Logo from "shared/Logo/Logo";
import SocialsList1 from "shared/SocialsList1/SocialsList1";
import { CustomLink } from "data/types";
import React from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Getting started",
    menus: [
      { href: "#", label: "Installation" },
      { href: "#", label: "Release Notes" },
      { href: "#", label: "Upgrade Guide" },
      { href: "#", label: "Browser Support" },
      { href: "#", label: "Editor Support" },
    ],
  },
  {
    id: "1",
    title: "Explore",
    menus: [
      { href: "#", label: "Design features" },
      { href: "#", label: "Prototyping" },
      { href: "#", label: "Design systems" },
      { href: "#", label: "Pricing" },
      { href: "#", label: "Security" },
    ],
  },
  {
    id: "2",
    title: "Resources",
    menus: [
      { href: "#", label: "Best practices" },
      { href: "#", label: "Support" },
      { href: "#", label: "Developers" },
      { href: "#", label: "Learn design" },
      { href: "#", label: "Releases" },
    ],
  },
  {
    id: "4",
    title: "Community",
    menus: [
      { href: "#", label: "Discussion Forums" },
      { href: "#", label: "Code of Conduct" },
      { href: "#", label: "Community Resources" },
      { href: "#", label: "Contributing" },
      { href: "#", label: "Concurrent Mode" },
    ],
  },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <div className="nc-Footer w-full relative py-12  border-t border-neutral-200 dark:border-neutral-700 ">
        <div
          style={{ marginBottom: "16px" }}
          className="hidden lg:block w-full"
        >
          <div className="flex place-content-center">
            <ButtonPrimary link="/entrar">
              ENTRAR - ÁREA RESERVADA
            </ButtonPrimary>
          </div>
          <div
            className="flex place-content-center"
            style={{ marginTop: "6px" }}
          >
            <p>Reservado a Anunciantes.</p>
          </div>
        </div>
        <div>
          <div className="w-full" style={{ textAlign: "center" }}>
            <Logo />
          </div>
          <div className="" style={{ marginBottom: "6px" }}>
            <SocialsList1 className="flex items-center justify-center" />
          </div>

          <div className="flex items-center justify-center">
            <span>© 2006 - 2022 MOMENTOS DE PRAZER</span>
          </div>
          <div className="flex items-center justify-center">
            <span>ACOMPANHANTES LISBOA - ESCORTS PORTUGAL</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
