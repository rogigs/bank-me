import { PayableProvider } from "@/context/payable.context";

const PayableLayout = ({ children }: { children: React.ReactNode }) => {
  return <PayableProvider>{children}</PayableProvider>;
};

export default PayableLayout;
