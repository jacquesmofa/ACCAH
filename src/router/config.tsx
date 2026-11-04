import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import AboutPage from "../pages/about/page";
import WorkPage from "../pages/work/page";
import ArkPage from "../pages/credentials-ark/page";
import ImpactPage from "../pages/impact/page";
import PartnersPage from "../pages/partners/page";
import InvolvedPage from "../pages/get-involved/page";
import DonatePage from "../pages/donate/page";
import NewsPage from "../pages/news/page";
import ContactPage from "../pages/contact/page";
import PrivacyPage from "../pages/privacy/page";
import AccessibilityPage from "../pages/accessibility/page";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/work", element: <WorkPage /> },
  { path: "/credentials-ark", element: <ArkPage /> },
  { path: "/impact", element: <ImpactPage /> },
  { path: "/partners", element: <PartnersPage /> },
  { path: "/get-involved", element: <InvolvedPage /> },
  { path: "/donate", element: <DonatePage /> },
  { path: "/news", element: <NewsPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/privacy", element: <PrivacyPage /> },
  { path: "/accessibility", element: <AccessibilityPage /> },
  { path: "*", element: <NotFound /> },
];

export default routes;