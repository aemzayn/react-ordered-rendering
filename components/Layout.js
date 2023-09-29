import Head from "next/head";

export default function Layout({ children, meta }) {
  const defaultMeta = {
    title: "Pokemon",
    description: "Pokemon app",
    ...meta,
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>{defaultMeta.title}</title>
        <meta name="description" content={defaultMeta.description} />
      </Head>
      <main className="w-full">{children}</main>
    </div>
  );
}
