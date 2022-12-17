import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import PageHome from "containers/PageHome/PageHome";
import Page404 from "containers/Page404/Page404";
import ListingStayPage from "containers/ListingStayPage/ListingStayPage";
import ListingStayMapPage from "containers/ListingStayPage/ListingStayMapPage";
import ListingExperiencesPage from "containers/ListingExperiencesPage/ListingExperiencesPage";
import ListingExperiencesMapPage from "containers/ListingExperiencesPage/ListingExperiencesMapPage";
import ListingStayDetailPage from "containers/ListingDetailPage/ListingStayDetailPage";
import ListingExperiencesDetailPage from "containers/ListingDetailPage/ListingExperiencesDetailPage";
import ListingCarPage from "containers/ListingCarPage/ListingCarPage";
import ListingCarMapPage from "containers/ListingCarPage/ListingCarMapPage";
import ListingCarDetailPage from "containers/ListingDetailPage/ListingCarDetailPage";
import CheckOutPage from "containers/CheckOutPage/CheckOutPage";
import PayPage from "containers/PayPage/PayPage";
import AuthorPage from "containers/AuthorPage/AuthorPage";
import AccountPage from "containers/AccountPage/AccountPage";
import AccountPass from "containers/AccountPage/AccountPass";
import AccountSavelists from "containers/AccountPage/AccountSavelists";
import AccountBilling from "containers/AccountPage/AccountBilling";
import PageContact from "containers/PageContact/PageContact";
import PageAbout from "containers/PageAbout/PageAbout";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSubcription from "containers/PageSubcription/PageSubcription";
import BlogPage from "containers/BlogPage/BlogPage";
import BlogSingle from "containers/BlogPage/BlogSingle";
import PageAddListing1 from "containers/PageAddListing1/PageAddListing1";
import PageAddListing2 from "containers/PageAddListing1/PageAddListing2";
import PageAddListing3 from "containers/PageAddListing1/PageAddListing3";
import PageAddListing4 from "containers/PageAddListing1/PageAddListing4";
import PageAddListing5 from "containers/PageAddListing1/PageAddListing5";
import PageAddListing6 from "containers/PageAddListing1/PageAddListing6";
import PageAddListing7 from "containers/PageAddListing1/PageAddListing7";
import PageAddListing8 from "containers/PageAddListing1/PageAddListing8";
import PageAddListing9 from "containers/PageAddListing1/PageAddListing9";
import PageAddListing10 from "containers/PageAddListing1/PageAddListing10";
import PageHome2 from "containers/PageHome/PageHome2";
import ListingRealEstateMapPage from "containers/ListingRealEstatePage/ListingRealEstateMapPage";
import ListingRealEstatePage from "containers/ListingRealEstatePage/ListingRealEstatePage";
import SiteHeader from "containers/SiteHeader";
import ListingFlightsPage from "containers/ListingFlightsPage/ListingFlightsPage";
import FooterNav from "components/FooterNav";
import useWindowSize from "hooks/useWindowResize";
import PageHome3 from "containers/PageHome/PageHome3";
import MainEntry from "containers/PageHome/MainEntry";
import PageAddListingnovo from "containers/PageAddListing1/PageAddListingnovo";
import PageAddListingAtendimento from "containers/PageAddListing1/PageAddListingAtendimento";
import PageAddListingVerificacao from "containers/PageAddListing1/PageAddListingVerificacao";
import useFindUser from "hooks/useFindUser";
import { UserContext } from "hooks/UserContext";
import OmeuAnuncio from "containers/AccountPage/OmeuAnuncio";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import PrevisualizarAnuncio from "containers/ListingDetailPage/PrevisualizarAnuncio";
import PesquisaBarAcompanhantes from "containers/ListingExperiencesPage/PesquisaBarResults";
import PrivateRoute from "utils/PrivateRoute";
export const pages: Page[] = [
  { path: "/", exact: true, component: MainEntry },
  { path: "/#", exact: true, component: MainEntry },
  {
    path: "/acompanhantes-de-luxo",
    exact: true,
    component: ListingExperiencesPage,
  },
  {
    path: "/acompanhantes-de-luxo/:slug",
    component: ListingExperiencesDetailPage,
  },
  { path: "/pesquisa/", component: PesquisaBarAcompanhantes },
  {
    path: "/acompanhantes-de-luxo/previsualizar/:slug",
    component: PrevisualizarAnuncio,
  },
  { path: "/registo", component: PageSignUp },
  { path: "/entrar", component: PageLogin },
  { path: "/termos-e-condicoes", component: BlogSingle },

  //
  { path: "/checkout", component: CheckOutPage },
  { path: "/pay-done", component: PayPage },
  //

  { path: "/blog", component: BlogPage },
  { path: "/blog-single", component: BlogSingle },

  { path: "/contact", component: PageContact },
  { path: "/about", component: PageAbout },
  { path: "/subscription", component: PageSubcription },

  //
];

const MyRoutes = () => {
  const { user, setUser, isLoading } = useFindUser();
  return (
    <BrowserRouter
      basename={process.env.NODE_ENV === "production" ? "chisfis" : ""}
    >
      <UserContext.Provider value={{ user, setUser, isLoading }}>
        <ScrollToTop />
        <SwitchDarkMode />
        <SiteHeader />
        <Routes key={Date.now()}>
          {pages.map(({ component, path }) => {
            const Component = component;
            return (
              <Route key={Date.now()} element={<Component />} path={path} />
            );
          })}

          <Route path="/painel" element={<PrivateRoute />}>
            <Route path="/painel" element={<AccountPage />} />
          </Route>
          <Route path="/account-password" element={<PrivateRoute />}>
            <Route path="/account-password" element={<AccountPass />} />
          </Route>
          <Route path="/meuanuncio" element={<PrivateRoute />}>
            <Route path="/meuanuncio" element={<OmeuAnuncio />} />
          </Route>
          <Route path="/pagamentos" element={<PrivateRoute />}>
            <Route path="/pagamentos" element={<AccountBilling />} />
          </Route>
          <Route path="/meuanuncio" element={<PrivateRoute />}>
            <Route path="/meuanuncio" element={<OmeuAnuncio />} />
          </Route>

          <Route path="/adicionaranuncio" element={<PrivateRoute />}>
            <Route path="/adicionaranuncio" element={<PageAddListing1 />} />
          </Route>
          <Route path="/adicionaranuncio-1" element={<PrivateRoute />}>
            <Route path="/adicionaranuncio-1" element={<PageAddListingnovo />} />
          </Route>
          <Route path="/adicionaranuncio-2" element={<PrivateRoute />}>
            <Route path="/adicionaranuncio-2" element={<PageAddListing2 />} />
          </Route>
          <Route path="/adicionaranuncio-3" element={<PrivateRoute />}>
            <Route path="/adicionaranuncio-3" element={<PageAddListing5 />} />
          </Route>
          <Route path="/adicionaranuncio-4" element={<PrivateRoute />}>
            <Route path="/adicionaranuncio-4" element={<PageAddListing6 />} />
          </Route>
          <Route path="/adicionaranuncio-5" element={<PrivateRoute />}>
            <Route path="/adicionaranuncio-5" element={<PageAddListing7 />} />
          </Route>
          <Route path="/adicionaranuncio-6" element={<PrivateRoute />}>
            <Route path="/adicionaranuncio-6" element={<PageAddListingAtendimento />} />
          </Route>
          <Route path="/adicionaranuncio-7" element={<PrivateRoute />}>
            <Route path="/adicionaranuncio-7" element={<PageAddListingVerificacao />} />
          </Route>
          <Route path="/adicionaranuncio-8" element={<PrivateRoute />}>
            <Route path="/adicionaranuncio-8" element={<PageAddListing10 />} />
          </Route>

          <Route element={<Page404 />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default MyRoutes;
