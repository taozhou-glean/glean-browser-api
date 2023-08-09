import { useContext, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { EmbedConfigContext, EmbeddedSearchWidget, baseOptionsKey } from "../EmbedConfigContext";

const ChatPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const {config} = useContext(EmbedConfigContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!window.EmbeddedSearch) return;

    window.EmbeddedSearch.renderChat(containerRef.current, {
      chatId: searchParams.get("chatId") ?? "",
      onChat: (chatId: string) => setSearchParams({ chatId }),
      onSearch: (query: string) => navigate({ pathname: '/search', search: new URLSearchParams({ query }).toString() }),
      ...config[baseOptionsKey],
      ...config[EmbeddedSearchWidget.Chat]
    });
  }, [searchParams, setSearchParams, navigate, config]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    />
  );
};

export default ChatPage;
