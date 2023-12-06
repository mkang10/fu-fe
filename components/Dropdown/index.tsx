"use-client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import UserDropDown from "../UserDropDown";
import AdminDropDown from "../AdminDropDown";
import MentorDropDown from "../MentorDropDown";
import { logout } from "@/redux/slices/user";
interface HeaderProps {
  fullName: string | undefined;
  userName: string | undefined;
  image: string;
}
function DropDown({ fullName, userName, image }: HeaderProps) {
  const role: number = useSelector(
    (state: RootState) => state.user.currentUser.UserRole
  );
  const userId: string = useSelector(
    (state: RootState) => state.user.currentUser.sub
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/sign-in");
  };

  return (
    <>
      {role === 0 ? (
        <UserDropDown
          userId={userId}
          image={image}
          userName={userName}
          fullName={fullName}
          functionHandleLogout={handleLogout}
        />
      ) : role === 1 ? (
        <MentorDropDown
          userId={userId}
          image={image}
          userName={userName}
          fullName={fullName}
          functionHandleLogout={handleLogout}
        />
      ) : (
        <AdminDropDown functionHandleLogout={handleLogout} />
      )}
    </>
  );
}

export default DropDown;
