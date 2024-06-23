import {siteConfig} from "../../config/site";

export function SiteFooter() {
    return (
      <footer className="relative p-4 z-10">
          <div className="container items-center flex flex-col justify-end">
                <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built by{" "}
                    <a
                        href={siteConfig.links.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        pbrissaud
                    </a>
                    . The source code is available on{" "}
                    <a
                        href={siteConfig.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        GitHub
                    </a>
                    .
                </p>
            </div>
        </footer>
    )
}