import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const withAuthRole =
  (allowedRoles: number[]) => (WrappedComponent: React.ComponentType) => {
    const Wrapper: React.FC = (props) => {
      const userRole = useSelector(
        (state: RootState) => state.user.currentUser.UserRole
      );
      const router = useRouter();
      const [isRoleChecked, setIsRoleChecked] = useState(false);
      const [isAuthorized, setIsAuthorized] = useState(false);

      useEffect(() => {
        if (userRole) {
          const allowedRoleStrings = allowedRoles.map(String);
          if (!allowedRoleStrings.includes(String(userRole))) {
            router.push("/");
          } else {
            setIsAuthorized(true);
          }

          setIsRoleChecked(true);
        }
      }, [userRole]);

      // Render loading state if the role check is in progress
      if (!isRoleChecked) {
        return <div>Loading...</div>;
      }

      // Return the WrappedComponent if authorized, otherwise redirect to "/"
      if (isAuthorized) {
        return <WrappedComponent {...props} />;
      }

      // Redirect to "/" if not authorized
      router.push("/");
      return null;
    };

    return Wrapper;
  };

export default withAuthRole;
