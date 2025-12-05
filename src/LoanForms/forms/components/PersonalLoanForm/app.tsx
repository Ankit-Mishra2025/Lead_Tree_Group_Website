import { Toaster, ToastBar } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 5000, // default 5 seconds
          style: {
            padding: '16px 24px',
            fontSize: '16px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <div>
                <div className="flex items-center gap-2">
                  {icon}
                  <span>{message}</span>
                </div>

                {/* Progress bar using CSS animation */}
                <div className="mt-2 h-1 w-full bg-gray-300 rounded overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded"
                    style={{
                      animation: `toastProgress ${t.duration}ms linear forwards`,
                    }}
                  />
                </div>
              </div>
            )}
          </ToastBar>
        )}
      </Toaster>

      <style jsx>{`
        @keyframes toastProgress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </>
  );
}
