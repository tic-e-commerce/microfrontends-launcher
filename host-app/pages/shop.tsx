import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const ShopPage = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    if (!token || !user_id) {
      router.push("/");
    }
  }, []);
  return (
    <div>
      <Header />
      <h1>Shop</h1>
      <p>Shop content</p>
      <Footer />
    </div>
  );
};

export default ShopPage;
