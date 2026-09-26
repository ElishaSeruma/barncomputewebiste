import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

// Every marketing page shares the site navigation and the gradient footer.
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
