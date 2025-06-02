import Image from 'next/image'

export const Logo = () => {
	return (
		<div className="">
			<Image src="/logo.svg" height={56} width={152} alt="Logo" />
		</div>
	)
}
