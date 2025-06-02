'use client'

import { Button } from '@/shared/ui/kit/button'
import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'

const ErrorPage = () => {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-y-2">
			<AlertTriangle className="size-8" />
			<p className="text-sm">Something went wrong</p>
			<Button variant="secondary" asChild>
				<Link href="/">Back to home</Link>
			</Button>
		</div>
	)
}

export default ErrorPage
