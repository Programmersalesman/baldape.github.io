import Home from "../../src/pages/Home";
import Layout from "../../src/components/Layout";

export function meta() {
  return [
    { title: "Home | BaldApe Services" },
    {
      name: "description",
      content:
        "Home page for BaldApe Services - Professional Discord Community Management.",
    },
  ];
}

export default function HomeRoute() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}
