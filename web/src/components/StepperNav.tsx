"use client"

import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

export interface StepperNavProps extends React.HTMLAttributes<HTMLElement> {
	onNextStep: any,
	onPreviousStep: any,
	currentStep: number,
	setStep?: any,
	items?: {
		step: number
		title: string
	}[]
}

export const StepperNav = ({ className, currentStep, onNextStep, onPreviousStep, setStep, items, ...props }: StepperNavProps) =>
(
	<nav
		className={cn(
			"flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
			className
		)}
		{...props}
	>
		{items?.map(({ step, title }) => (
			<Button
				key={step}
				variant={currentStep === step ? 'secondary' : 'ghost'}
				onClick={() => setStep(step)}
			>
				{title}
			</Button>
		))}
	</nav>
)
