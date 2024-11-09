"use client";

import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import { ThemeProvider } from '@/components/ThemeProvider';

// Crisp customer chat support:
// This component is separated from ClientLayout because it needs to be wrapped with <SessionProvider> to use useSession() hook
// All the client wrappers are here (they can't be in server components)
// 1. NextTopLoader: Show a progress bar at the top when navigating between pages
// 2. Toaster: Show Success/Error messages anywhere from the app with toast()
// 3. Tooltip: Show tooltips if any JSX elements has these 2 attributes: data-tooltip-id="tooltip" data-tooltip-content=""
// 4. CrispChat: Set Crisp customer chat support (see above)
const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider>
            {/* Show a progress bar at the top when navigating between pages */}
            <NextTopLoader color="#00b7ff" showSpinner={false} />

            {/* Content inside app/page.js files  */}
            {children}

            {/* Show Success/Error messages anywhere from the app with toast() */}
            <Toaster
                toastOptions={{
                    duration: 3000,
                    style: {
                        borderRadius: '10px',
                        background: 'transparent',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)', /* Safari support */
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        color: '#fff',
                    },
                }}
                position="bottom-center"
            />

            {/* Show tooltips if any JSX elements has these 2 attributes: data-tooltip-id="tooltip" data-tooltip-content="" */}
            <Tooltip
                id="tooltip"
                className="z-[60] !opacity-100 max-w-sm shadow-lg"
            />

            {/* Set Crisp customer chat support */}
        </ThemeProvider>
    );
};

export default ClientLayout;
