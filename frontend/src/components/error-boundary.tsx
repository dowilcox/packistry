import React from 'react'
import { Button } from '@/components/ui/button'

interface Props {
    children: React.ReactNode
}

interface State {
    hasError: boolean
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(): State {
        return { hasError: true }
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error('Uncaught error:', error, info.componentStack)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex h-screen flex-col items-center justify-center gap-4 bg-background text-foreground">
                    <h1 className="text-2xl font-semibold">Something went wrong</h1>
                    <p className="text-muted-foreground">An unexpected error occurred.</p>
                    <Button
                        variant="outline"
                        onClick={() => {
                            this.setState({ hasError: false })
                            window.location.reload()
                        }}
                    >
                        Reload page
                    </Button>
                </div>
            )
        }

        return this.props.children
    }
}
