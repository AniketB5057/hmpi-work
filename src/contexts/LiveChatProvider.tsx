import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    $crisp: any;
    CRISP_WEBSITE_ID: any;
  }
}

interface LiveChatContextInterface {
  openLiveChat: () => void;
  hideLiveChat: () => void;
}

export const LiveChatContext = createContext({} as LiveChatContextInterface);

type LiveChatProviderProps = {
  children?: React.ReactNode;
};

const LiveChatProvider = ({ children }: LiveChatProviderProps) => {
  const { userInfo } = useAuth();

  const [width, setWidth] = useState<number>(window.innerWidth);
  const openLiveChat = () => {
    if (window && window.$crisp) {
      window.$crisp.push(["do", "chat:show"]);
      window.$crisp.push(["do", "chat:open"]);
    }
  };
  const hideLiveChat = () => {
    if (window && window.$crisp) {
      window.$crisp.push(["do", "chat:close"]);
      window.$crisp.push(["do", "chat:hide"]);
    }
  };

  const initChat = () => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "16ab7b2d-a040-4092-9219-23d6043e169b";
    (function () {
      let d = window.document;
      let s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = true;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  };

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    const timerCheck = setInterval(() => {
      if (window && window.$crisp) {
        if (window && window.$crisp && window.$crisp.is("chat:closed")) {
          window.$crisp.push(["config", "hide:on:mobile", true]);
          window.$crisp.push(["do", "chat:hide"]);
        }
      }
    }, 200);
    () => {
      clearInterval(timerCheck);
    };
  }, []);
  useEffect(() => {
    if (userInfo && userInfo.email) {
      if (window && window.$crisp) {
        window.$crisp.push(["set", "user:email", [`${userInfo.email}`]]);
        window.$crisp.push([
          "set",
          "user:nickname",
          [`${userInfo.firstName} ${userInfo.lastName}`],
        ]);
      }
    }
  }, [userInfo]);
  useEffect(() => {
    initChat();
  }, []);
  return (
    <LiveChatContext.Provider
      value={{
        hideLiveChat: hideLiveChat,
        openLiveChat: openLiveChat,
      }}
    >
      {children}
    </LiveChatContext.Provider>
  );
};

export function useLiveChat() {
  return useContext(LiveChatContext);
}

export default LiveChatProvider;
