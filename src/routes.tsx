import Home from './pages/Home';
import NotFound from './pages/NotFound';
import DemoLinks from './pages/DemoLinks';
import TestimonialDemo from './pages/TestimonialDemo';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <Home />
  },
  {
    name: 'Demo Links',
    path: '/demo-links',
    element: <DemoLinks />,
    visible: false
  },
  {
    name: 'Testimonial Demo',
    path: '/testimonial-demo',
    element: <TestimonialDemo />,
    visible: false
  },
  {
    name: 'Not Found',
    path: '*',
    element: <NotFound />
  }
];

export default routes;
