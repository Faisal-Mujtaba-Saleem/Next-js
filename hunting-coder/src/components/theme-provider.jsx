"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
    children,
    ...props
}) {
    const [componentDidMount, setComponentDidMount] = React.useState(false);

    React.useEffect(() => {
        setComponentDidMount(true);
    }, []);

    if (!componentDidMount) {
        return null;
    }
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}