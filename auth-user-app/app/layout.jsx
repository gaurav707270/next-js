import "./globals.css";
import ReduxProvider from "@/redux-store/store/Provider";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ReduxProvider>
                    {children}
                </ReduxProvider>
            </body>
        </html>
    );
}