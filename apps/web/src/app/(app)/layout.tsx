import {SiteHeader} from "../../components/nav/site-header";
import React from "react";


interface AppLayoutProps {
    children: React.ReactNode
}

export default function LandingLayout({ children }: AppLayoutProps) {
    return (
      <div className="relative flex flex-col min-h-screen bg-background">
          <SiteHeader/>
          <div className="flex-grow">
              {children}
          </div>
      </div>
)
}