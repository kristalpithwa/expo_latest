import { AuthProvider } from "../context/auth";
import { AppRouter } from "../components/Router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
