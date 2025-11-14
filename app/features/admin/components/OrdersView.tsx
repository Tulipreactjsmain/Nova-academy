import { AdminView } from "../types";
import OrdersList from "./OrdersList";

export default function OrdersView({ setCurrentView, setSelectedOrderId }: { setCurrentView: (view: AdminView) => void, setSelectedOrderId: (id: string) => void }) {
  return (
    <section>
      {/* <h2 className="text-xl md:text-2xl font-semibold text-blue-80 mb-4">
        All Orders
      </h2> */}
      <OrdersList setCurrentView={setCurrentView} setSelectedOrderId={setSelectedOrderId} />
    </section>
  );
} 