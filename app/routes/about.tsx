import About from "../../src/pages/About";
import Layout from "../../src/components/Layout";

export function meta() {
  return [
    { title: "About | BaldApe Services" },
    {
      name: "description",
      content:
        "About BaldApe Services and professional Discord community management.",
    },
  ];
}

export default function AboutRoute() {
  return (
    <Layout>
      <About />
    </Layout>
  );
}
