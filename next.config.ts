import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [78, 82, 90],
    formats: ["image/webp"]
  },
  async redirects() {
    return [
      {source: "/chiptuning", destination: "/nl/chiptuning", permanent: true},
      {source: "/auto-diagnose", destination: "/nl/auto-diagnose", permanent: true},
      {source: "/diensten", destination: "/nl/diensten", permanent: true},
      {source: "/prijzen", destination: "/nl/prijzen", permanent: true},
      {source: "/resultaten", destination: "/nl/resultaten", permanent: true},
      {source: "/blog", destination: "/nl/blog", permanent: true},
      {source: "/nieuws-blog", destination: "/nl/blog", permanent: true},
      {source: "/nieuws", destination: "/nl/blog", permanent: true},
      {source: "/over-ons", destination: "/nl/over-ons", permanent: true},
      {source: "/contact", destination: "/nl/contact", permanent: true},
      {source: "/afspraak", destination: "/nl/afspraak", permanent: true},
      {source: "/stage-1-chiptuning", destination: "/nl/stage-1-tuning", permanent: true},
      {source: "/stage-2-chiptuning", destination: "/nl/stage-2-tuning", permanent: true},
      {source: "/adblue-nox-diagnose", destination: "/nl/adblue-storing", permanent: true},
      {source: "/egr-dpf-diagnose", destination: "/nl/dpf-storing", permanent: true},
      {source: "/voorwaarden-disclaimer", destination: "/nl/algemene-voorwaarden", permanent: true},
      {source: "/veelgestelde-vragen", destination: "/nl/contact", permanent: true},
      {source: "/en/tuning-results", destination: "/en/results", permanent: true},
      {source: "/en/online-fileservice", destination: "/en/contact", permanent: true},
      {source: "/pl/contact", destination: "/pl/kontakt", permanent: true},
      {source: "/kontakt", destination: "/pl/kontakt", permanent: true},
      {source: "/pl/wyniki-chiptuningu", destination: "/pl/rezultaty", permanent: true},
      {source: "/pl/fileservice-online", destination: "/pl/kontakt", permanent: true},
      {source: "/tuning-resultaten", destination: "https://power.noordtune.nl/", permanent: true},
      {source: "/tuning-resultaten/:path*", destination: "https://power.noordtune.nl/", permanent: true}
    ];
  }
};

export default nextConfig;
