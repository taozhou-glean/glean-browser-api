import { PropsWithChildren, useState } from "react";
import Header from "./Header";
import { EmbedConfigContext, defaultConfig } from "../../EmbedConfigContext";

const PageLayout = ({ children }: PropsWithChildren) => {
  const [config, setConfig] = useState(defaultConfig)

  return <EmbedConfigContext.Provider value={{config, setConfig}}>
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-fixed w-full flex-shrink flex-grow-0 px-4 w-fixed w-full flex-shrink flex-grow-0 px-4 border-b border-gray-20 shadow-md">
        <div className="sticky top-0 p-4 w-full h-full z-50">
          <Header />
        </div>
      </div>
      <main role="main" className="w-full flex-auto">
        {children}
      </main>
    </div>
  </EmbedConfigContext.Provider>
};

export default PageLayout;
