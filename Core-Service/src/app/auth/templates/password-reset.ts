export const passwordResetEmail = (otp: string) => {
    return {
        subject: "Password Reset OTP",
        html: `
            <!DOCTYPE html>
            <html>
                <body>
                    <h1>Password Reset</h1>

                    <p>Your password reset OTP is:</p>

                    <h2>${otp}</h2>

                    <p>This OTP will expire in 10 minutes.</p>
                </body>
            </html>
        `,
    };
};