import { useEffect } from "react";
import PropTypes from "prop-types";
import router from "next/router";
import { getSession, useSession } from "next-auth/client";

const withAuth = (WrappedComponent) => {
  const RequiresAuthentication = (props) => {
    const [session, loading] = useSession();

    useEffect(() => {
      if (!session) {
        router.push("/api/auth/signin");
      }
    }, [session]);

    return session ? <WrappedComponent {...props} /> : <div>Loading...</div>;
  };

  return RequiresAuthentication;
};

withAuth.propTypes = {
  WrappedComponent: PropTypes.node.isRequired,
};

export default withAuth;
