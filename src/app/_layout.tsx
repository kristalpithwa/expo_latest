import { AuthProvider } from "../context/auth";
import { AppRouter } from "./Router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
