// import Chat from "@/app/components/Chat";

// export default function Home(): JSX.Element {
//   return (
//     <div className="min-h-screen p-4 md:p-8 lg:p-12 flex flex-col items-center bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black transition-colors duration-300">
//       <header className="w-full max-w-xl mb-12 text-center">
//         <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-red-600">
//           Pomegranate
//         </h1>
//         <p className="text-xl text-gray-600 dark:text-gray-300">
//           The first iteration of ProviderPrep
//         </p>
//       </header>

//       <main className="w-full max-w-xl flex-1">
//         <Chat />
//       </main>

//       <footer className="w-full max-w-xl mt-12 text-center">
//         <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Bang on it!</p>
//       </footer>
//     </div>
//   );
// }

import Chat from "@/app/components/Chat";
// import { useTheme } from "next-themes";

export default function Home(): JSX.Element {
  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'linear-gradient(to bottom, white, #f3f4f6)'
    }}>
      <header style={{
        width: '100%',
        maxWidth: '650px',
        marginBottom: '3rem',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '0.75rem',
          background: 'linear-gradient(to right, #8b5cf6, #ec4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Pomegranate
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: '#6b7280'
        }}>
          The first iteration of ProviderPrep
        </p>
      </header>

      <main style={{
        width: '100%',
        maxWidth: '650px',
        flexGrow: 1
      }}>
        <Chat />
      </main>

      <footer style={{
        width: '100%',
        maxWidth: '650px',
        marginTop: '3rem',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '1.125rem',
          fontWeight: '500',
          color: '#4b5563'
        }}>
          Bang on it!
        </p>
      </footer>
    </div>
  );
}