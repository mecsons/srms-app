import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'
import LoginForm from "@/modules/auth/components/login-form.tsx";

export const Route = createFileRoute('/_public/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-sm shadow-none">
          <CardHeader>
            <div className="flex flex-col justify-center items-center">
              <div className="size-20">
                <img
                    src="/assets/logo.png"
                    alt="Mecsons"
                    className="w-full h-full object-contain"
                />
              </div>

              <div className={'text-center'}>
                <CardTitle>Mecsons | SRMS</CardTitle>
                <CardDescription className={'text-xs'}>
                  Welcome, please log in to proceed.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
  )
}
