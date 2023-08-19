import { matchRoutes, useLocation } from "react-router-dom";

const routes = [{ path: "/movieapp/movie/:id" }];

const useCurrentPath = () => {
  const location = useLocation();
  const matchedRoutes = matchRoutes(routes, location);

  return matchedRoutes?.[0]?.route?.path ?? '';
}

export default useCurrentPath;