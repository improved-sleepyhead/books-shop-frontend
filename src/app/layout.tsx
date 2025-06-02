import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

import './globals.css'
import { TanstackQueryProvider } from '@/providers/query-provider'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Projetto',
	description: 'The project tracking app',
	icons: {
		icon: [
			{
				url: '/icon.svg',
				href: '/icon.svg'
			}
		]
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressContentEditableWarning>
			<body
				className={cn(
					inter.className,
					'min-h-screen antialiased'
				)}
			>
				<TanstackQueryProvider>
					<Toaster position="bottom-center" />

					{children}
				</TanstackQueryProvider>
			</body>
		</html>
	)
}
