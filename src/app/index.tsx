import { Redirect } from "expo-router";
import { useAuth } from "../contexts/auth";

export default function Home() {
  const { isAuthenticated } = useAuth();
  return <Redirect href={isAuthenticated ? "/dashboard" : "/login"} />;
}
