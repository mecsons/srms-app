import { Input } from '@/components/ui/input.tsx'
import { FieldGroup } from '@/components/ui/field'
import { Button } from '@/components/ui/button.tsx'
import { FormField } from '@/components/ui/form.tsx'
import { PasswordInput } from '@/components/ui/password-input.tsx'
import { useLoginForm } from '@/modules/auth/lib/hooks/use-login-form'

export default function LoginForm() {
    const { form, onSubmit } = useLoginForm()

    const formIsSubmitting = form.formState.isSubmitting

    return (
        <form className={'grid gap-6'} onSubmit={onSubmit}>
            <FieldGroup>
                <FormField
                    label={'Username'}
                    name={'username'}
                    control={form.control}
                    render={({ field }) => <Input {...field} />}
                />

                <FormField
                    label={'Password'}
                    name={'password'}
                    control={form.control}
                    render={({ field }) => <PasswordInput {...field} />}
                />
            </FieldGroup>

            <Button type={"submit"} className="mt-2" disabled={formIsSubmitting}>
                {formIsSubmitting ? 'Logging in...' : 'Login'}
            </Button>
        </form>
    )
}