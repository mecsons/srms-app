import * as React from 'react'
import { Eye, EyeOff } from 'lucide-react'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group.tsx'

export const PasswordInput = React.forwardRef<
    HTMLInputElement,
    React.ComponentProps<'input'>
>(({ ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
        <InputGroup>
            <InputGroupInput
                {...props}
                ref={ref}
                type={showPassword ? 'text' : 'password'}
                autoComplete="off"
            />
            <InputGroupAddon
                align="inline-end"
                className="cursor-pointer select-none"
                onClick={() => setShowPassword((prev) => !prev)}
            >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </InputGroupAddon>
        </InputGroup>
    )
})