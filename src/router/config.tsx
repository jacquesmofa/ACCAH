import type { RouteObject } from "react-router-dom";
import Layout from "@/components/feature/Layout";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/home/page";
import About from "@/pages/about/page";
import Services from "@/pages/services/page";
import Cgirls from "@/pages/cgirls/page";
import Events from "@/pages/events/page";
import Partners from "@/pages/partners/page";
import GetInvolved from "@/pages/get-involved/page";
import Contact from "@/pages/contact/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "services", element: <Services /> },
      { path: "cgirls", element: <Cgirls /> },
      { path: "events", element: <Events /> },
      { path: "partners", element: <Partners /> },
      { path: "get-involved", element: <GetInvolved /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export default routes;