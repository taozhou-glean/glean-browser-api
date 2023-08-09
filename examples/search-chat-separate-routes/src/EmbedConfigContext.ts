import { createContext } from "react";

const baseOptions = {
    authToken: undefined,
    backend: 'https://salessavvy-test-be.glean.com',
    disableAnalytics: false,
    domainsToOpenInCurrentTab: [],
    enableActivityLogging: true,
    locale: undefined,
    onAuthTokenRequired: () => {},
    themeVariant: 'auto',
    urlsToOpenInCurrentTab: [],
    webAppUrl: "https://canary.glean.com"
}

const searchOptons = {
    datasource: undefined,
    datasourcesFilter: [],
}

const boxOptions = {
    border: undefined,
    borderRadius: 8,
    boxShadow: 'none',
    horizontalMargin: 0,
    verticalMargin: 0,
}

export const baseOptionsKey = 'Options';
export const searchOptionsKey = 'Search Options';

export const enum EmbeddedSearchWidget {
    SearchBox = 'Search Box',
    SearchResults = 'Search Results',
    Chat = 'Chat',
}

export const defaultConfig = {
    [baseOptionsKey]: baseOptions,
    [searchOptionsKey]: searchOptons,
    [EmbeddedSearchWidget.SearchBox]: {
        autofocus: true,
        searchBoxCustomizations: {
            ...boxOptions,
            borderRadius: 24,
            boxShadow: "none",
            placeholderText: "Search for anything..."
        },
    },
    [EmbeddedSearchWidget.SearchResults]: {
        hideDatasourceFilter: false,
        hideTopBarFilters: false,
        showAutocompleteContent: false,
        showHomePageContent: false,
        showInlineSearchBox: false,
    },
    [EmbeddedSearchWidget.Chat]: {
        customizations: {
            container: boxOptions,
        },
        initialMessage: "Who can I ask about Embedded Search", 
    },
}

const defaultContext = {
    config: defaultConfig,
    setConfig: (config: any) => {},
}

export const EmbedConfigContext = createContext(defaultContext);