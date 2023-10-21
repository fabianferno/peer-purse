import Skeleton from '@mui/material/Skeleton'
import makeBlockie from 'ethereum-blockies-base64'
import type { CSSProperties, ReactElement } from 'react'
import { useMemo } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export interface IdenticonProps {
	username: string
	size?: number
	radius?: number
}

const Identicon = ({ username, radius, size = 40 }: IdenticonProps): ReactElement => {
	const style = useMemo<CSSProperties | null>(() => {
		try {
			return {
				width: `${size}px`,
				height: `${size}px`,
				borderRadius: `${radius}px`
			}
		} catch (e) {
			return null
		}
	}, [size, radius])

	return !style ? (
		<Skeleton variant="circular" width={size} height={size} />
	) : (
		<Avatar>
			<AvatarImage style={style} src={makeBlockie(username)} alt={username} />
			<AvatarFallback>{username}</AvatarFallback>
		</Avatar>
	)
}

export default Identicon