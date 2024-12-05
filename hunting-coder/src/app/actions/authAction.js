"use server"

const { signIn, signOut } = require("@/lib/auth")

export const signInAction = async (signIn_form) => {
    await signIn(
        signIn_form.get("provider")
    )
}

export const signOutAction = async (signOut_form) => {
    await signOut(
        signOut_form.get("provider")
    );
}