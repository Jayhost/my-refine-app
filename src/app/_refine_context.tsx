"use client";

import { GitHubBanner, Refine, type AuthProvider } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { notificationProvider, RefineSnackbarProvider } from "@refinedev/mui";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { MuiInferencer } from "@refinedev/inferencer/mui";
import React from "react";

import routerProvider from "@refinedev/nextjs-router";

import { ColorModeContextProvider } from "@contexts/color-mode";
import { dataProvider } from "@providers/data-provider";



import { AccountCircleOutlined,ChatBubbleOutline,PeopleAltOutlined,StarOutlineRounded,VillaOutlined } from "@mui/icons-material";

type RefineContextProps = {
  defaultMode?: string;
};

export const RefineContext = (
  props: React.PropsWithChildren<RefineContextProps>
) => {
  return (
    <SessionProvider>
      <App {...props} />
    </SessionProvider>
  );
};

type AppProps = {
  defaultMode?: string;
};

const App = (props: React.PropsWithChildren<AppProps>) => {
  const { data, status } = useSession();
  const to = usePathname();

  if (status === "loading") {
    return <span>loading...</span>;
  }

  const authProvider: AuthProvider = {
    login: async () => {
      signIn("google", {
        callbackUrl: to ? to.toString() : "/",
        redirect: true,
      });

      return {
        success: true,
      };
    },
    logout: async () => {
      signOut({
        redirect: true,
        callbackUrl: "/login",
      });

      return {
        success: true,
      };
    },
    onError: async (error) => {
      if (error.response?.status === 401) {
        return {
          logout: true,
        };
      }

      return {
        error,
      };
    },
    check: async () => {
      if (status === "unauthenticated") {
        return {
          authenticated: false,
          redirectTo: "/login",
        };
      }

      return {
        authenticated: true,
      };
    },
    getPermissions: async () => {
      return null;
    },
    getIdentity: async () => {
      if (data?.user) {
        const { user } = data;
        return {
          name: user.name,
          avatar: user.image,
          email: user.email,
        };
      }

      return null;
    },
  };

  const defaultMode = props?.defaultMode;

  return (
    <>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider defaultMode={defaultMode}>
          <RefineSnackbarProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider}
              notificationProvider={notificationProvider}
              authProvider={authProvider}
              resources={[
                {
                  name: "blog_posts",
                  list: "/blog-posts",
                  create: "/blog-posts/create",
                  edit: "/blog-posts/edit/:id",
                  show: "/blog-posts/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: "properties",
                  list: "/properties",
                  show: "/properties/show",
                  create: "/properties/create",
                  edit: "/properties/edit",
                  icon: <VillaOutlined />,
                },
                {
                  name: "agents",
                  list: "/agent",
                  show: "/agent/profile",
                  icon: <PeopleAltOutlined />,
                },
                  // {
                  //   name: "review",
                  //   list: MuiInferencer,
                  //   icon: <StarOutlineRounded/>,
                  // },
                  // {
                  //   name: "message",
                  //   list: MuiInferencer,
                  //   icon: <ChatBubbleOutline/>,
                  // },
                  {
                    name: "my-profile",
                    options: {label : 'My Profile'},
                    list: "/profile",
                    icon: <AccountCircleOutlined/>,
                  }
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
              }}
            >
              {props.children}
              <RefineKbar />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </>
  );
};
