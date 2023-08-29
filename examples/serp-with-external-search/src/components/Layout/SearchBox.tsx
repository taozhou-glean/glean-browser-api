import { useCallback, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useEmbeddedSearchAuth from "../../hooks/useEmbeddedSearchAuth";
import { mergeQueryParams } from "../../utils/queryParams";

const SearchBox = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { authToken, backend, refreshAuthToken } = useEmbeddedSearchAuth();

  const query = searchParams.get("query") ?? "";

  /**
   * Navigates to search page with the search query
   */
  const handleSearch = useCallback(
    (query: string) =>
      navigate({
        pathname: "/search",
        search: mergeQueryParams(new URLSearchParams(location.search), { query }).toString(),
      }),
    [navigate]
  );

  useEffect(() => {
    if (!window.EmbeddedSearch || !authToken) return;

    // Render a search box with any additional options / customisations applied
    // Documentation: https://dev.glean.com/meta/browser_api/interfaces/SearchBoxOptions.html
    window.EmbeddedSearch.renderSearchBox(containerRef.current, {
      authToken,
      backend,
      enableActivityLogging: true,
      onSearch: handleSearch,
      onAuthTokenRequired: refreshAuthToken,
      query,
      searchBoxCustomizations: {
        border: '1px solid #dedede',
        borderRadius: 0,
        boxShadow: "none",
        placeholderText: "Search for anything...",
      },
    });
  }, [handleSearch, query, authToken, backend, refreshAuthToken]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "48px", // Required
        width: "600px", // Should match expected width of the search box
        position: "relative", // Required
        zIndex: 2, // Should be higher than any other elements below
      }}
    />
  );
};

export default SearchBox;
