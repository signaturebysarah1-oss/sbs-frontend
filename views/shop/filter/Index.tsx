import ProductFiltersSidebar from "./Filters";
import Products from "./Products";

const Index = () => {
  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
      <ProductFiltersSidebar />

      <div>
        <Products />
      </div>
    </section>
  );
};

export default Index;