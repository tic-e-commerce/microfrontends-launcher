import { useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirigir a la ruta de login al cargar el componente
    router.push("/login");
  }, [router]);

  return (
    <main>
      <Header />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Home;
