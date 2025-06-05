import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isHomePage = request.nextUrl.pathname === "/";
  // const isChatPage = request.nextUrl.pathname === "/chat/";
  const isLoginPage = request.nextUrl.pathname === "/login";

  // redirect un-authenticated user from / page
  if ((isHomePage || request.nextUrl.pathname.startsWith("/chat")) && !user) {
    const loginUrl = new URL("/login", request.url);
    console.log(request.nextUrl.pathname);

    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // // redirect logged in user from login page
  // if (isLoginPage && user) {
  //   const homeUrl = new URL("/", request.url);
  //   return NextResponse.redirect(homeUrl);
  // }

  // Redirect authenticated users from login to home or redirect URL
  if (isLoginPage && user) {
    const redirectUrl = request.nextUrl.searchParams.get("next") || "/";
    const destinationUrl = new URL(redirectUrl, request.url);
    return NextResponse.redirect(destinationUrl);
  }

  return response;
}

// export const config = {
//   matcher: ["/", "/login"], // runs only for homepage
// };

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login|chat/:path*|assets).*)",
    "/login",
    "/chat/:path*",
  ],
};
