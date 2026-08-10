import { auth } from "@/lib/auth";
// import type { AppRole } from "@/lib/auth/modules/authorization/permissions";
import { NextRequest, NextResponse } from "next/server";

const AUTH_ONLY_PATHS = ["/auth/sign-in", "/auth/sign-up"];
const SESSION_COOKIE_NAME =
  process.env.NODE_ENV === "development"
    ? "better-auth.session_token"
    : "__Secure-better-auth.session_token";
// const ROLE_PROTECTED: { prefix: string; requiredRole: AppRole }[] = [
//   { prefix: "/dashboard/settings", requiredRole: "admin" },
//   { prefix: "/dashboard/users", requiredRole: "admin" },
// ];

export async function proxy(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
