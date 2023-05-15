const SiteLayout = ({ children }) => <div>{children}</div>;

export const getLayout = page => {
  return <SiteLayout>{page}</SiteLayout>;
};

export default SiteLayout;
