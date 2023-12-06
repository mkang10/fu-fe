import { store } from "./redux/store";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/dist/server/web/spec-extension/response";
import jwt_decode from "jwt-decode";

interface DecodedToken {
  email: string;
  sub: string;
  UserRole: number;
  isUpdated: number;
  moderateStatus: number;
  "remember-me": boolean;
  iat: number;
}

function directToUnauthenticated(
  verify: RequestCookie | undefined,
  url: string | string[]
) {
  return (
    !verify &&
    (url.includes("/blog") ||
      url.includes("/blog/create") ||
      url.includes("/user") ||
      url.includes("/admin") ||
      url.includes("/notification") ||
      url.includes("/profile") ||
      url.includes("/update-info") ||
      url === "http://localhost:3000/")
  );
}

function isUserUpdated(verify: RequestCookie): boolean {
  if (verify) {
    const decodedToken = jwt_decode(verify.value) as DecodedToken;
    const isUpdated = decodedToken.isUpdated === 1; // Check if isUpdated is 1

    return isUpdated;
  }

  return false; // Return false if verify is undefined
}

export default function middleware(
  req: NextRequest
): NextResponse<unknown> | undefined {
  let verify = req.cookies.get("accessToken");
  let url = req.url;

  if (directToUnauthenticated(verify, url)) {
    return NextResponse.redirect("http://localhost:3000/auth/sign-in");
  }

  if (
    verify &&
    !isUserUpdated(verify) &&
    url === "http://localhost:3000/"
  ) {
    return NextResponse.redirect("http://localhost:3000/update-info");
  }

  if (verify && url.includes("/auth")) {
    return NextResponse.redirect("http://localhost:3000/");
  }

  return NextResponse.next();
}
