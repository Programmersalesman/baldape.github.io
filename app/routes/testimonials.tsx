import Testimonials from "../../src/pages/Testimonials";
import Layout from "../../src/components/Layout";

export function meta() {
  return [
    { title: "Testimonials | BaldApe Services" },
    {
      name: "description",
      content: "Client testimonials for BaldApe Services.",
    },
  ];
}

export default function TestimonialsRoute() {
  return (
    <Layout>
      <Testimonials />
    </Layout>
  );
}
