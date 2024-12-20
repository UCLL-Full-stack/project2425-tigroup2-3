import Head from "next/head";
import Header from "@/components/Header";
import PresetForm from "@/components/presetForm";


const Preset: React.FC = () => {
  return (
    <div className="min-h-full">
        <Head>
        <title>Boardflex</title>
        <meta name="description" content="Boardflex app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main>
        <h1>New Preset</h1>
        <PresetForm />
        </main>
    </div>
    );
}

export default Preset;