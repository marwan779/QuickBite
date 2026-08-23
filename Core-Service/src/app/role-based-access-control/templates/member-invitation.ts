export const memberInvitationEmail = (otp: string, role: string) => {
    return {
        subject: "You're invited to join QuickBite",
        html: `
            <!DOCTYPE html>
            <html>
                <body>
                    <h1>Welcome to QuickBite</h1>

                    <p>
                        You have been invited to join a restaurant
                        as a <strong>${role}</strong>.
                    </p>

                    <p>Your OTP is:</p>

                    <h2>${otp}</h2>

                    <p>This OTP will expire in 1 hour.</p>
                </body>
            </html>
        `,
    };
};