import Head from "next/head";
import About from "../components/About";
import Contact from "../components/Contact";
import Gallery from "../components/Gallery";
import Landing from "../components/Landing";
import Services from "../components/Services";

const Home = () => (
    <>
        <Head>
            <title>Diva Care</title>
            <script type="application/ld+json">
                {/** TODO: Page Specific SEO */}
            </script>
        </Head>
        <Landing />
        <Services />
        <About />
        <Gallery />
        <Contact />
    </>
);

export default Home;
