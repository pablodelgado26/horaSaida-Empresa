import "./globals.css";

export const metadata = {
  title: "Calculadora de Hora de Saída",
  description: "Calcule seu horário de saída baseado em 8h48min de jornada",
};

export default function RootLayout({ children }) {
    return (
        <html>
            <body>{children}</body>
        </html>
    );
}
